import mongoose, { Schema } from "mongoose";
const organizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    adminEmail: {
      type: String,
      required: true,
      unique: true,
    },
    owner_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

// Create the model and specify the collection name as 'organizations'
const Organization =
  mongoose.models?.Organization ||
  mongoose.model("Organization", organizationSchema, "organizations");

export default Organization;
