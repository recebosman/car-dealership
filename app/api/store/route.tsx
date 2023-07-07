import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (!req || !req.json)
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 400 }
    );

  const body = await req.json();
  const { name, user_email } = body;

  if (!name || !user_email) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  const storeLength = await prisma.store.count({
    where: {
      user: {
        email: user_email,
      },
    },
  });

  if (storeLength >= 3) {
    return NextResponse.json(
      {
        error:
          "You can't create more than 3 stores. If you want more than 3 stores, please contact the website owner",
      },
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

  return NextResponse.json(
    {
      message: "Store created successfully",
    },
    { status: 200 }
  );
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  const store = await prisma.store.findMany({
    where: {
      user: {
        email,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json({ store }, { status: 200 });
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  const store = await prisma.store.delete({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json(
    {
      message: "Store deleted successfully",
    },
    { status: 200 }
  );
}
