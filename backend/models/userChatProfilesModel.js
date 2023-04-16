import mongoose from "mongoose";

const userChatProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    profiles: Array,
  },

  {
    timestamps: true,
  }
);

export default mongoose.model("UserChattedprofile", userChatProfileSchema);
