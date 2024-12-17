import mongoose, { Schema } from "mongoose";

// Define the schema for OrgMembership
const OrgMembershipSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User", // References the User model
      required: true,
    },
    org_id: {
      type: Schema.Types.ObjectId,
      ref: "Organization", // References the Organization model
      required: true,
    },
    org_role_id: {
      type: Schema.Types.ObjectId,
      ref: "OrgRole", // References the OrgRole model
      required: true,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create the model and specify the collection name as 'org_membership'
const OrgMembership =
  mongoose.models?.OrgMembership ||
  mongoose.model("OrgMembership", OrgMembershipSchema, "org_membership");

export default OrgMembership;
