import crypto from "crypto";
import mongoose from "mongoose";
import ActionToken from "@/models/actionToken";
import dbConnect from "@/lib/dbConnect";
import Organization from "@/models/organization";
import User from "@/models/user";

export const generateAddEmployeeToken = async (
  userId: string,
  email: string,
  org_role_id: string,
) => {
  await dbConnect(); // Ensure DB connection

  if (!mongoose.Types.ObjectId.isValid(org_role_id && userId)) {
    throw new Error("Invalid userId");
  }

  const organization = await Organization.findOne({ owner_id: userId });
  const org_id=organization._id;
  if (!organization) {
    throw new Error(`No organization found for that user:`);
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("A user with this email already exists.");
  }
  const token = crypto.randomBytes(20).toString("hex"); // Generates a 40-character token

  try {
    // Save the token to the database
    const actionToken = new ActionToken({
      token,
      user: userId,
      action: "New employee Add",
      expiresAt: new Date(Date.now() + 60 * 60 * 1000 * 24 * 30), // Token expiration (30 Days)
      meta: {
        email, // Add email to meta
        org_role_id, // Add organization role ID to meta
        org_id, // Add organization ID to meta
      },
    });

    await actionToken.save(); // Save the ActionToken to the database

    // Create the approval URL with the token
    const baseUrl = process.env.DOMAIN_BASE_URL; // Assumes DOMAIN_BASE_URL is defined in your .env file
    const approveUrl = `${baseUrl}/admin/account//new?token=${token}`;
    return approveUrl; // Return the approval URL
  } catch (error) {
    console.error("Error saving ActionToken:", error);
    throw error;
  }
};
