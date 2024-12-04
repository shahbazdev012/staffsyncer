import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthConfig } from "next-auth";
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
          return Promise.reject(new Error("Email and password are required."));
        }

        try {
          const response = await fetch(
            `${process.env.NEXTAUTH_URL}/api/auth/credentials?email=${email}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.API_SECRET}`,
              },
            }
          );

          if (!response.ok) {
            return Promise.reject(new Error("User does not exist"));
          }

          const user = await response.json();
          const isMatch = await compare(password, user.password);

          if (!isMatch) {
            return Promise.reject(new Error("Invalid password"));
          }

          return { name: user.name, email: user.email, id: user._id  };
        } catch (error) {
          console.log(error);
          return Promise.reject(
            new Error("Error during credentials authorization")
          );
        }
      },
    }),
  ],
  pages: { signIn: "/signin" },
};

export default authConfig;
