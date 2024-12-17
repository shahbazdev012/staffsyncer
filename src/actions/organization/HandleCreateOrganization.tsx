"use server";
import ActionToken from "@/models/actionToken";
import Organization from "@/models/organization";
import User from "@/models/user";
import GlobalRole from "@/models/globalRole";
import dbConnect from "@/lib/dbConnect";
import createOrganizationRoles from "./createOrganizationRoles";
const HandleCreateOrganization = async (token: string, orgName: string) => {
  await dbConnect();
  try {
    if (!token || !orgName) {
      throw new Error("Token and organization name are required.");
    }
    const actionToken = await ActionToken.findOne({ token });
    if (!actionToken) {
      throw new Error("Invalid or expired token.");
    }

    const { user: userId, email } = actionToken;
    if (!userId || !email) {
      throw new Error("Invalid token data.");
    }
    const organization = await Organization.create({
      name: orgName,
      adminEmail: email,
      owner_id: userId,
    });
    const orgAdminRole = await GlobalRole.findOne({ name: "org_admin" });
    if (!orgAdminRole) {
      throw new Error("Global role 'org_admin' not found in the database.");
    }
    await User.findByIdAndUpdate(userId, {
      global_role_id: orgAdminRole._id,
    });
    await actionToken.deleteOne();

    await createOrganizationRoles(organization._id);
    return;
  } catch (error) {
    console.error("Error in HandleCreateOrganization:", error || error);
    throw error; // Re-throw the original error
  }
};

export default HandleCreateOrganization;
