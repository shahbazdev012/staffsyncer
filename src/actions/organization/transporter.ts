import nodemailer from "nodemailer";
import genearteOrganizationtoken from "./genearteOrganizationtoken";
import { auth } from "../../auth";
import juice from "juice";
const email = process.env.SENDER_EMAIL;
const pass = process.env.MAIL_PASS;

// Create a transporter object using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass: pass,
  },
});

// Send email
const sendEmail = async (email: string) => {
  const session = await auth();
  const user_id = session?.user._id as string;
  const token = await genearteOrganizationtoken(user_id,email);
  const html = `
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .container {
          background-color: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: auto;
          text-align: center;
        }
        p {
          color: #333;
          font-size: 16px;
          line-height: 1.6;
          margin: 10px 0;
        }
        a {
          display: inline-block;
          padding: 10px 20px;
          margin: 20px 0;
          background-color: #4CAF50;
          color: #fff;
          text-decoration: none;
          border-radius: 5px;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <p>A new organization creation request has been made.</p>
        <p>Please click the link below to approve the request:</p>
        <a href="${token}">Approve Organization</a>
      </div>
    </body>
  </html>
  `;

  const mailOptions = {
    from: email,
    to: email,
    subject: "Test Email with Gmail SMTP",
    text: "This is a test email sent using Outlook SMTP.",
    html: juice(html),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
    return error;
  }
};

export default sendEmail;
