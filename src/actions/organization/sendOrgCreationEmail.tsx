"use server";
import { redirect } from "next/navigation";
import sendEmail from "./transporter";
const sendOrgCreationEmail = async (email: string) => {
  try {
  sendEmail(email);
    redirect("/");
  } catch (error) {
    const err = error as any;
    return err.cause;
  }
};
export { sendOrgCreationEmail };
