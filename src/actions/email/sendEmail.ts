import nodemailer from "nodemailer";
import juice from "juice";

const email = process.env.SENDER_EMAIL;
const pass = process.env.MAIL_PASS;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass: pass,
  },
});

// Generic reusable email sender
export const sendEmail = async ( to: string,subject: string,htmlContent: string) => {
  const mailOptions = {
    from: email,
    to,
    subject,
    html: juice(htmlContent), // Inline CSS for email clients
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
