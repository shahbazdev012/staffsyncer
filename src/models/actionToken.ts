import mongoose from "mongoose";

// Define the schema for ActionToken
const actionTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true, // Ensure each token is unique
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    action: {
      type: String,
      required: true, // Define the type of action (e.g., "verify_email", "reset_password")
    },
    email:
    {
      type:String,
      required:true,
    },
    expiresAt: {
      type: Date,
      required: true, // Set an expiration date for the token
      default: () => new Date(Date.now() + 60 * 60 * 1000), // Default to 1 hour from now
      index: { expireAfterSeconds: 0 }, // TTL index for auto-deletion
    },
  },
  { timestamps: true } // Automatically create 'createdAt' and 'updatedAt'
);

// Create the model and specify the collection name as 'action_tokens'
const ActionToken =
  mongoose.models?.ActionToken || mongoose.model("ActionToken", actionTokenSchema, "action_tokens");

export default ActionToken;
