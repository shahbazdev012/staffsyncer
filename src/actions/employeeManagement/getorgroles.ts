"use server"
import dbConnect from "@/lib/dbConnect";
import Organization from "@/models/organization";
import OrgRole from "@/models/organizationRole";

export const Getorgroles = async (userId: string) => {
  try {
    await dbConnect();
    const organization = await Organization.findOne({ owner_id: userId });
    if (!organization) {
      throw new Error(`No organization found for that user:`);
    }
    const orgRoles = await OrgRole.find({
      organization_id: organization._id,
    });
    const serializedOrgRoles = orgRoles.map(role => ({
        _id: role._id.toString(),  // Ensure _id is serialized as a string
        name: role.name,
      }));

console.log(serializedOrgRoles,"fe")
    return serializedOrgRoles;
  } catch (error) {
    console.error("Error in GetOrgRoles:", error);
      throw error; // Rethrow the error so it can be caught in the frontend
  }
};
