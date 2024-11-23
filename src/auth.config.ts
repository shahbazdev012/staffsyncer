import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { compare } from "bcryptjs";

const authConfig: NextAuthConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET_ID!,
    }),
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;

        if (!email || !password) {
          return Promise.reject(new Error("Email and password are required.")); // Reject with an error
        }

        try {
          // Make a GET request to the /api/auth/credentials endpoint to fetch the user data
          const response = await fetch(
            `${process.env.NEXTAUTH_URL}/api/auth/credentials?email=${email}`,
            {
              method: "GET", 
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            return Promise.reject(new Error("User does not Exists")); // Reject with error
          }

          const user = await response.json(); // Parse the response into JSON
          const isMatch = await compare(password, user.password);
          
          if (!isMatch) {
            return Promise.reject(new Error("Invalid password")); // Reject if password doesn't match
          }

          // Successfully authenticated
          return { name: user.name, email: user.email, id: user._id };
          
        } catch (error) {
          // Catch any error during the fetch or password comparison
         console.log(error)
            return Promise.reject(new Error("Error during credentials authorization. Please try again.")); // Reject with a generic error
        }
      },
    }),
  ],
  pages: { signIn: "/signin" },
};

export default authConfig;
