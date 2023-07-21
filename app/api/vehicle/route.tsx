import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { VehicleTypes, Vehicles } from "@prisma/client";

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
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const vehicleByName = searchParams.get("name");
  const vehicleByType = searchParams.get("vehicle_type");

  try {
    if (id) {
      const idNumber = parseInt(id);

      const vehicleById = await prisma.vehicles.findUnique({
        where: {
          id: idNumber,
        },
        include: {
          Images: true,
        },
      });

      if (!vehicleById) {
        return NextResponse.json(
          { error: "Vehicle not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({ vehicleById }, { status: 200 });
    } else {
      let vehicles;

      if (vehicleByName && vehicleByType) {
        vehicles = await prisma.vehicles.findMany({
          where: {
            AND: [
              {
                name: {
                  contains: vehicleByName,
                },
              },
              {
                vehicle_type: {
                  equals: vehicleByType as VehicleTypes,
                },
              },
            ],
          },
          include: {
            Images: true,
          },
        });
      } else if (vehicleByType) {
        vehicles = await prisma.vehicles.findMany({
          where: {
            vehicle_type: {
              equals: vehicleByType as VehicleTypes,
            },
          },
          include: {
            Images: true,
          },
        });
      } else if (vehicleByName) {
        vehicles = await prisma.vehicles.findMany({
          where: {
            name: {
              contains: vehicleByName,
            },
          },
          include: {
            Images: true,
          },
        });
      } else {
        vehicles = await prisma.vehicles.findMany({
          include: {
            Images: true,
          },
        });
      }

      return NextResponse.json({ vehicles }, { status: 200 });
    }
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
