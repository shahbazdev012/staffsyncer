import mongoose from "mongoose";

// Define the schema for the GlobalRole
const globalRoleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  { timestamps: true }
);

// Create the model and specify the collection name as 'global_roles'
const GlobalRole = mongoose.models?.GlobalRole || mongoose.model("GlobalRole", globalRoleSchema, "global_roles");

export default GlobalRole;
