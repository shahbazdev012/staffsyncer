import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    _id?:string;
  }

  interface Session {
    user: User & DefaultSession["user"];
  }

  interface JWT {
    _id: string;
  }
}
