import prisma from "@/lib/prisma";
import { Fav_Vehicles } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (!req || !req.json)
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 400 }
    );
  const body = await req.json();
  const { UserId, VehicleId }: Fav_Vehicles = body;

  if (!UserId || !VehicleId)
    return NextResponse.json(
      { error: "Please provide all the required fields" },
      { status: 400 }
    );

  const exit_fav = await prisma.fav_Vehicles.findFirst({
    where: {
      UserId,
      VehicleId,
    },
  });

  if (exit_fav) {
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

  return NextResponse.json(
    {
      fav,
    },
    { status: 200 }
  );
}

export async function GET(req: Request) {
  const body = await req.json();

  const { UserId }: Fav_Vehicles = body;

  if (!UserId)
    return NextResponse.json(
      { error: "Please provide all the required fields" },
      { status: 400 }
    );

  const fav = await prisma.fav_Vehicles.findMany({
    where: {
      UserId,
    },
  });

  return NextResponse.json(
    {
      message: "Vehicles that you have added to favorites",
      data: fav,
    },
    { status: 200 }
  );
}

export async function DELETE(req: Request) {
  const body = await req.json();

  const { UserId, VehicleId }: Fav_Vehicles = body;

  if (!UserId || !VehicleId)
    return NextResponse.json(
      { error: "Please provide all the required fields" },
      { status: 400 }
    );

  const fav = await prisma.fav_Vehicles.delete({
    where: {
      id: UserId,
    },
  });

  return NextResponse.json(
    {
      message: "Vehicle removed from favorites",
    },
    { status: 200 }
  );
}
