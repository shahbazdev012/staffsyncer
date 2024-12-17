"use server";
//import sendEmail from "./transporter";

import { sendEmail } from "../email/sendEmail";

import { newEmployeeJoinTemplate } from "../../components/server/email/templates/newEmployeeJoinTemplate";
import { auth } from "../../auth";
import { generateAddEmployeeToken } from "./generateAddEmployeeToken";
const sendEmployeeCreationEmail = async (email: string, org_role_id:string) => {
  try {
    const session = await auth();
    const userId = session?.user._id as string;
    // Generate token
    const token = await generateAddEmployeeToken(userId, email,org_role_id);

    // Generate HTML using template
    const html = newEmployeeJoinTemplate(token);

    // Send email
    await sendEmail(
      email, // Recipient email
      "Add New eployee in organization", // Email subject
      html // HTML content
    );
    return;
  } catch (error) {
    throw error;
  }
};
export { sendEmployeeCreationEmail };
