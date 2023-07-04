import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { User, Vehicles } from "@prisma/client";

export async function POST(req: any, res: any) {
  const body = await req.json();

  const {
    name,
    model,
    vehicle_class,
    vehicle_type,
    year,
    kilometers,
    price,
  }: Vehicles = body;

  if (
    !name ||
    !model ||
    !vehicle_class ||
    !vehicle_type ||
    !year ||
    !kilometers ||
    !price
  ) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  return NextResponse.json(body);
}
