import mongoose, { Schema } from "mongoose";

// Define the schema for a OrgRole
const OrgRoleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    organization_id: {
        type: Schema.Types.ObjectId,
        ref: "Organization",
        required: true,
      },
    description: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// Create the model and specify the collection name as 'OrgRoles'
const OrgRole = mongoose.models?.OrgRole || mongoose.model("OrgRole", OrgRoleSchema, "org_roles");

export default OrgRole;
