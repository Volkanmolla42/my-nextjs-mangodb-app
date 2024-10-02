import mongoose from "mongoose";

// Define the User schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Name is required
  },
  email: {
    type: String,
    required: true, // Email is required
    unique: true, // Ensure email is unique
  },
});

// If the model is already defined, don't redefine it
export default mongoose.models.User || mongoose.model("User", UserSchema);
