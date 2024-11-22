import { verify } from "crypto";
import mongoose, { Schema, model, models } from "mongoose";

const UserSchema: Schema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, select :false},
  googleId: {type: String},
  githubId: { type: String, required: false, default: null },
});

const User = mongoose.models?.User || mongoose.model("User", UserSchema);

export default User;
