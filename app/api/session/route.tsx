import { getServerSession } from "next-auth";
import { handler as authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return NextResponse.json({
    authenticated: !!session,
    session,
  });
}
