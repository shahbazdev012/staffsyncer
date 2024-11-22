"use server";
import { CredentialsSignin } from "next-auth";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";
const credentialsSigin = async (email: string, password: string) => {
  try {
    await signIn("credentials", {
      email,
      password,
    });
    redirect("/");
  } catch (error) {
    const err = error as CredentialsSignin;
    return err.cause;
  }
};
export { credentialsSigin };
