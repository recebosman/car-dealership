import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Vehicles } from "@prisma/client";

export async function POST(req: Request, res: Response) {
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
    user_email,
    store_id,
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
    },
  });

  return NextResponse.json({ vehicle }, { status: 200 });
}
