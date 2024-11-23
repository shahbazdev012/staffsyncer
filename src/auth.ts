// src/auth.ts
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import User from "./models/user";
import dbConnect from "./lib/dbConnect";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  callbacks: {
    signIn: async ({ user, account }) => {
      if (account?.provider === "google" || account?.provider === "github") {
        try {
          const { email, name, id } = user;
          await dbConnect();
          const alreadyUser = await User.findOne({ email });
          if (!alreadyUser) {
            await User.create({ email, name, githubId: id });
          }
          return true;
        } catch (err) {
          console.error("Error during user creation:", err); // Log the error
          return false; // Return false to indicate sign-in failure
        }
      }
      if (account?.provider === "credentials") {
        return true; // Allow sign-in for valid credentials
      }
      return false; // Return false for unsupported providers
    },
    session: async ({ session }) => {
      // Add database lookup here if needed
      return session;
    },
  },
});
