import mongoose, { Schema } from "mongoose";
import GlobalRole from "./globalRole";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, select: false },
    googleId: { type: String },
    githubId: { type: String, required: false, default: null },
    global_role_id: {
      type: Schema.Types.ObjectId,
      ref: "GlobalRole", // Reference to the GlobalRole model
      required: true, // User must have a role
    },
  },
  { timestamps: true }
);

// Pre-save hook to set the role to "user" by default
UserSchema.pre("validate", async function (next) {
  if (!this.global_role_id) {
    const defaultRole = await GlobalRole.findOne({ name: "user" });
    if (defaultRole) {
      this.global_role_id = defaultRole._id;
    } else {
      throw new Error("Default role 'user' not found in the database.");
    }
  }
  next();
});

const User = mongoose.models?.User || mongoose.model("User", UserSchema);

export default User;
