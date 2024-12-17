import NextAuth from "next-auth";
import authConfig from "./auth.config";
import dbConnect from "./lib/dbConnect"; // Assuming your database connection utility
import User from "./models/user"; // Your User model
// Extend JWT to include role

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  callbacks: {
    signIn: async ({ user, account }) => {
      try {
        const { email, name, id } = user;

        await dbConnect(); // Ensure DB connection

        let existingUser = await User.findOne({ email });

        if (
          !existingUser &&
          (account?.provider === "google" || account?.provider === "github")
        ) {
          // If user doesn't exist, create one with a default role
          existingUser = await User.create({
            email,
            name,
            githubId: id,
          });
        }
        // Attach the role to the user object
        user._id = existingUser._id;

        return true;
      } catch (err) {
        console.error("Error during user creation or lookup:", err);
        return false; // Prevent sign-in if there's an error
      }
    },
    jwt: async ({ token, user }) => {
      // Add role to the token if user exists
      if (user) {
        token._id = user._id;
      }
      return token;
    },
    session: async ({ session, token }) => {
      // Include role in the session object
      if (token) {
        session.user._id = token._id as string;
      }
      return session;
    },
  },
});
