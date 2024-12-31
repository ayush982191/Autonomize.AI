import mongoose from "mongoose"


const friendSchema = new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      friend: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
    { timestamps: true }
  );
  
  // module.exports = mongoose.model("Friend", friendSchema);
  
  const friend = mongoose.model("Friend",friendSchema);
  export default friend;