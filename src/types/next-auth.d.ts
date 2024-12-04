import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    role?: string; // Ensure this is a string
  }

  interface Session {
    user: User & DefaultSession["user"];
  }

  interface JWT {
    role: string; // Ensure this is a string
  }
}
