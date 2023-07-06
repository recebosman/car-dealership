import { User, UserTypes } from "@prisma/client";
import "next-auth/jwt";

type UserId = string;

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
    type: UserTypes;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & { id: UserId; type: UserTypes };
  }
}
