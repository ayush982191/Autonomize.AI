import axios from "axios";
import User from "../model/user.model.js";
import { fetchData } from "../utils/features.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "../middleware/error.js";

export const saveUserData = TryCatch(async (req, res, next) => {
  const { username } = req.body; 
  if (!username) return next(new ErrorHandler("please provide username"));

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(200).json({ success: true, message: existingUser });
  }

  const userData = await fetchData(username);
  if (!userData || !userData.login) {
    return next(new Error("Failed to fetch user data"));
  }

  const newUser = new User({
    username: userData.login,
    name: userData.name || "N/A",
    bio: userData.bio || "No bio available",
    blog: userData.blog || "No blog provided",
    location: userData.location || "Unknown",
    followers: userData.followers || 0,
    following: userData.following || 0,
    public_repos: userData.public_repos || 0,
    public_gists: userData.public_gists || 0,
  });

  await newUser.save();
  findAndSaveFriends(username);
  res.status(201).json({ 
    success: true,
    user : newUser,
     message: "User data saved successfully" });
});

export const findAndSaveFriends = TryCatch(async (username) => {
  const user = await User.findOne({ username });

  const followingUsers = await fetchData(`${username}/following`);
  const followers = await fetchData(`${username}/followers`);

  const mutualFollowers = followingUsers.filter((following) => followers.some((follower) => follower.login === following.login));
  user.friends = mutualFollowers.map((f) => f.login);
  await user.save();
});

export const searchUsers = TryCatch(async (req, res, next) => {
  const { username, location } = req.query;
  if(!username && !location)
    return next(new ErrorHandler("Username or location can't be empty", 403));

  const query = {};
  if (username) query.username = username;
  if (location) query.location = location;

  const users = await User.find(query);
  return res.status(200).json({ success: true, users });
});

export const softDeleteUser = TryCatch(async (req, res, next) => {
  const { username } = req.params;

  const user = await User.findOneAndUpdate({ username }, { isDeleted: true }, { new: true });

  if (!user) {
    return next(new ErrorHandler("user doesn't exist"));
  }

  res.status(200).json({ success: true, message: "User deleted successfully" });
});

export const updateUser = TryCatch(async (req, res) => {
  const { username } = req.params;
  const updatedData = req.body;

  const user = await User.findOneAndUpdate({ username }, updatedData);

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  return res.status(200).json({ success: true, message: "User updated successfully", user });
});

export const getUsersSorted = TryCatch(async (req, res) => {
  const { sortBy } = req.query;
  const users = await User.find().sort({ [sortBy]: -1 });
  res.status(200).json({ success: true, users });
});


export const showAll = TryCatch(async (req,res,next)=>{
  const user= await User.find();
  return res.status(200).json({
    success : true,
    message : user
  })
})