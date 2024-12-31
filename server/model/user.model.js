import mongoose from "mongoose"
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    name: String,
    bio: String,
    blog: String,
    location: String,
    followers: Number,
    following: Number,
    public_repos: Number,
    public_gists: Number,
    created_at: Date,
    updated_at: Date,
    deleted: { type: Boolean, default: false }, 
}, { timestamps: true });  

const User = mongoose.model("User", userSchema);
export default User;
