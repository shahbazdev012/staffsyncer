"use server";

import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";
import { hash } from "bcryptjs";

const credentialsSignup = async (
  name: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  // Validate input
  if (!name || !email || !password || !confirmPassword) {
    return { success: false, error: "All fields are required" };
  }

  if (password !== confirmPassword) {
    return { success: false, error: "Passwords do not match" };
  }
  await dbConnect();
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { success: false, error: "User already exists" };
    }
    // Hash the password
    const hashedPassword = await hash(password, 10);
    // Create the new user
    await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
    });
    // Indicate success
    return { success: true };
  } catch (error) {
    console.error("Signup error:", error);

    // Use a type guard to refine `error`
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }

    return { success: false, error: "An unexpected error occurred" };
  
  }
};

export { credentialsSignup };
