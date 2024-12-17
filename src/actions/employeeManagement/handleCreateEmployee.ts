"use server";
import ActionToken from "@/models/actionToken";
import User from "@/models/user";
import dbConnect from "@/lib/dbConnect";
import { hash } from "bcryptjs";
import OrgMembership from "@/models/organizationMembership";
interface CreateEmployeeParams {
  token: string;
  name: string;
  password: string;
  confirmPassword: string;
}
const handleCreateEmployee = async ({
    name,
  token,
  password,
  confirmPassword,
}: CreateEmployeeParams) => {
  const validateFields = (fields: Record<string, string>) => {
    for (const [key, value] of Object.entries(fields)) {
      if (!value) {
        throw new Error(
          `Invalid token data: Missing or invalid value for ${key}.`
        );
      }
    }
  };

  if (password !== confirmPassword) {
    throw new Error(`"passwords do not match.",${password},${confirmPassword}`);
  }

  await dbConnect();
  try {
    if (!token) {
      throw new Error("Token and organization name are required.");
    }
    const actionToken = await ActionToken.findOne({ token });
    if (!actionToken) {
      throw new Error("Invalid or expired token.");
    }

    const { user: userId, meta: { email, org_role_id, org_id } = {} } =
      actionToken;

    validateFields({
      name,
      password,
      confirmPassword,
      userId,
      email,
      org_role_id,
      org_id,
    });

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error("A user with this email already exists.");
    }

    const hashedpassword = await hash(password, 10);
    // Create the new user
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedpassword,
    });

    await OrgMembership.create({
      user_id: user._id,
      org_id: org_id,
      org_role_id: org_role_id,
    });

    await actionToken.deleteOne();
    return;
  } catch (error) {
    console.error("Error in HandleCreateOrganization:", error || error);
    throw error; // Re-throw the original error
  }
};

export default handleCreateEmployee;
