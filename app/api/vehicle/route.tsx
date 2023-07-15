import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Vehicles } from "@prisma/client";

export async function POST(req: Request) {
  if (!req || !req.json)
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 400 }
    );
  const body = await req.json();

  const {
    name,
    model,
    vehicle_class,
    vehicle_type,
    year,
    kilometers,
    price,
    fuel_type,
    user_email,
    store_id,
    images = [],
  } = body;

  if (
    !name ||
    !model ||
    !vehicle_class ||
    !vehicle_type ||
    !year ||
    !kilometers ||
    !user_email ||
    !store_id ||
    !fuel_type ||
    !images ||
    !price
  ) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  const vehicle: Vehicles = await prisma.vehicles.create({
    data: {
      name,
      model,
      vehicle_class,
      vehicle_type,
      year,
      kilometers,
      price,
      fuel_type,
      store: {
        connect: {
          id: store_id,
        },
      },
      user: {
        connect: {
          email: user_email,
        },
      },
      Images: {
        create: images.map((url: string) => ({
          url,
        })),
      },
    },
  });

  return NextResponse.json({ vehicle }, { status: 200 });
}

export async function GET(req: Request) {
  const vehicles = await prisma.vehicles.findMany({
    include: {
      Images: true,
    },
  });

  return NextResponse.json({ vehicles }, { status: 200 });
}
