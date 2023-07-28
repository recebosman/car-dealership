import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { UserEmail, VehicleId } = body;

  if (!UserEmail || !VehicleId) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  const user = await prisma.user.findFirst({
    where: {
      email: UserEmail,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 400 });
  }

  const exists = await prisma.fav_Vehicles.findFirst({
    where: {
      UserId: user.id,
      VehicleId,
    },
  });

  if (exists) {
    return NextResponse.json(
      { error: "This vehicle is already in your favorites" },
      { status: 400 }
    );
  }

  const fav = await prisma.fav_Vehicles.create({
    data: {
      UserId: user.id,
      VehicleId,
    },
  });

  return NextResponse.json({ fav }, { status: 200 });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const userEmail = searchParams.get("email");

  if (!userEmail) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  const user = await prisma.user.findFirst({
    where: {
      email: userEmail,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 400 });
  }

  const fav = await prisma.fav_Vehicles.findMany({
    where: {
      UserId: user.id,
    },
    include: {
      vehicle: {
        select: {
          id: true,
          model: true,
          name: true,
          year: true,
          vehicle_type: true,
          fuel_type: true,
          price: true,
          kilometers: true,
          Images: {
            select: {
              url: true,
              VehicleId: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json({ fav }, { status: 200 });
}
