import NextAuth, { AuthError, CredentialsSignin } from "next-auth";

import GoogleProvider from "next-auth/providers/google";
import CredentialrProvider from "next-auth/providers/credentials";
import User from "./models/user";
import { compare } from "bcryptjs";
import dbConnect from "./lib/dbConnect";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET_ID,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    CredentialrProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;

        if (!email || !password)
          throw new CredentialsSignin({
            cause: "email and password are required",
          });

        await dbConnect();
        const user = await User.findOne({ email }).select("+password");

        if (!user) throw new CredentialsSignin({ cause: "user not found" });
        if (!user.password)
          throw new CredentialsSignin({ cause: "invalid email or password" });
        const isMatch = await compare(password, user.password);

        if (!isMatch)
          throw new CredentialsSignin({ cause: "invalid password" });
        return { name: user.name, email: user.email, id: user._id };
      },
    }),
  ],
  callbacks: {
    signIn: async ({ user, account }) => {
      if (account?.provider === "google" || account?.provider === "github")
        try {
          const { email, name, id } = user;
          await dbConnect();
          const alreadyUser = await User.findOne({ email });
          if (!alreadyUser) {
            await User.create({ email, name, githubId: id });
          }
          return true;
        } catch (error) {
          throw new AuthError("Error while creating user");
        }
      if (account?.provider === "credentials") {
        return true; // Allow sign-in for valid credentials
      }
      return false;
    },
  },
  pages: {
    signIn: "/signin",
  },
});
