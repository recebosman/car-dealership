import { NextResponse } from "next/server";
import { useSession } from "next-auth/react";
import prisma from "@/lib/prisma";

export async function POST(req: Request, res: Response) {
  const { data: userInfo } = useSession();

  if (!userInfo) {
    return NextResponse.json("You need to be authenticated", {
      status: 401,
    });
  }

  const user_email = userInfo.user?.email;

  const body = await req.json();

  const { name, model, vehicle_class, year, kilometers, price } = body;

  if (!name || !model || !vehicle_class || !year || !kilometers || !price) {
    return NextResponse.json("You need to provide all fields", {
      status: 400,
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: user_email as string,
    },
  });

  if (!user) {
    return NextResponse.json("User not found", {
      status: 404,
    });
  }

  const vehicle = await prisma.vehicles.create({
    data: {
      name,
      model,
      vehicle_class,
      year,
      kilometers,
      price,
      UserId: user.id,
    },
  });

  return NextResponse.json(vehicle);
}
