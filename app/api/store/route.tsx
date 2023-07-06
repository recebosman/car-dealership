import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { name, user_email } = body;

  if (!name || !user_email) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }
  const existStore = await prisma.store.findFirst({
    where: {
      name,
    },
  });

  if (existStore) {
    return NextResponse.json(
      { error: "Store already exists" },
      { status: 400 }
    );
  }

  const store = await prisma.store.create({
    data: {
      name,
      user: {
        connect: {
          email: user_email,
        },
      },
    },
  });

  return NextResponse.json(name);
}
