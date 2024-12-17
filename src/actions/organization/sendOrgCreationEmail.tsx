"use server";
//import sendEmail from "./transporter";

import { sendEmail } from "../email/sendEmail";
import genearteOrganizationtoken from "./genearteOrganizationtoken";
import { approveOrganizationTemplate } from "../../components/server/email/templates/approveOrganizationTemplate";
import { auth } from "../../auth";
const sendOrgCreationEmail = async (email: string) => {
  try {
    const session = await auth();
    const userId = session?.user._id as string;

    // Generate token
    const token = await genearteOrganizationtoken(userId, email);

    // Generate HTML using template
    const html = approveOrganizationTemplate(token);

    // Send email
    await sendEmail(
      email, // Recipient email
      "Approve Organization Request", // Email subject
      html // HTML content
    );
    return;
  } catch (error) {
    const err = error;
    return err;
  }
};
export { sendOrgCreationEmail };
