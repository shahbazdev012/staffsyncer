"use server";
import sendEmail from "./transporter";
const sendOrgCreationEmail = async (email: string) => {
  try {
    await sendEmail(email);
    return;
  } catch (error) {
    const err = error;
    return err;
  }
};
export { sendOrgCreationEmail };
