import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json("You need to provide all fields", {
        status: 400,
      });
    }

    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (user) {
      return NextResponse.json("Email already exists", {
        status: 400,
      });
    }

    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);

    const strongPassword = isStrongPassword(password);

    if (!strongPassword) {
      return NextResponse.json("Please provide a strong password", {
        status: 400,
      });
    }

    await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashPassword,
      },
    });

    return NextResponse.json("User created successfully", {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: "An error occurred",
    });
  }
}

function isStrongPassword(password: string): boolean {
  const hasMinimumLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return (
    hasMinimumLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumber &&
    hasSpecialChar
  );
}
