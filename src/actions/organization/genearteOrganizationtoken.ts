import crypto from "crypto";
import mongoose from "mongoose";
import ActionToken from "@/models/actionToken";
import dbConnect from "@/lib/dbConnect";
import Organization from "@/models/organization";

const generateOrganizationToken = async (userId: string , email:string) => {
  await dbConnect(); // Ensure DB connection

  // Check if userId is valid
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid userId");
  }

  const existingOrganization = await Organization.findOne({ adminEmail: email });
  
  if (existingOrganization) {
    throw new Error("An organization with this admin email already exists.");
  }
  const token = crypto.randomBytes(20).toString("hex"); // Generates a 40-character token

  try {
    // Save the token to the database
    const actionToken = new ActionToken({
      token,
      user: userId,
      email:email,
      action: "creaFailed to find Server Actionte_organization",
      expiresAt: new Date(Date.now() + 60 * 60 * 1000), // Token expiration (1 hour)
    });

    await actionToken.save(); // Save the ActionToken to the database

    // Create the approval URL with the token
    const baseUrl = process.env.DOMAIN_BASE_URL; // Assumes DOMAIN_BASE_URL is defined in your .env file
    const approveUrl = `${baseUrl}/admin/approve-org/new?token=${token}`;
    return approveUrl; // Return the approval URL
  } catch (error) {
    console.error("Error saving ActionToken:", error);
    throw new Error("Failed to save action token");
  }
};

export default generateOrganizationToken;
