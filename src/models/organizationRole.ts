import mongoose, { Schema } from "mongoose";

// Define the schema for a OrganizationRole
const OrganizationRoleSchema = new mongoose.Schema(
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

// Create the model and specify the collection name as 'OrganizationRoles'
const OrganizationRole = mongoose.models?.OrganizationRole || mongoose.model("OrganizationRole", OrganizationRoleSchema, "OrganizationRoles");

export default OrganizationRole;
