import mongoose from "mongoose"
const repositorySchema = new mongoose.Schema(
    {
      name: { type: String, required: true }, 
      description: { type: String },  
      owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",  
        required: true,
      },
      stars: { type: Number, default: 0 },  
      forks: { type: Number, default: 0 },    
      visibility: { type: String, default: "public" },  
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model("Repository", repositorySchema);
  