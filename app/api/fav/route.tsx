import prisma from "@/lib/prisma";
import { Fav_Vehicles } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { UserId, VehicleId }: Fav_Vehicles = body;

  if (!UserId || !VehicleId) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  const exists = await prisma.fav_Vehicles.findFirst({
    where: {
      UserId,
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
      UserId,
      VehicleId,
    },
  });

  return NextResponse.json({ fav }, { status: 200 });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const userId = searchParams.get("userid");

  if (!userId) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  const fav = await prisma.fav_Vehicles.findMany({
    where: {
      UserId: Number(userId),
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json({ fav }, { status: 200 });
}
