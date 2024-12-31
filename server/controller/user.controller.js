import axios from "axios";
import User from "../model/user.model.js";
import { fetchData } from "../utils/features.js";
 
export const saveUserData = async (req, res) => {
    const { username } = req.body;
 
    const existingUser = await User.findOne({ username });

    if (existingUser) {
        return res.status(200).json({ success: true, message: existingUser });
    }

    try {  
        const userData = fetchData(username)
        const newUser = new User({
            username: userData.login,
            name: userData.name,
            bio: userData.bio,
            blog: userData.blog,
            location: userData.location,
            followers: userData.followers,
            following: userData.following,
            public_repos: userData.public_repos,
            public_gists: userData.public_gists, 
        });

        await newUser.save();

        res.status(201).json({ success: true, message: "User data saved successfully" });
    } catch (error) {
        console.error("Error fetching data from GitHub:", error);
        res.status(500).json({ success: false, message: "Error fetching data from GitHub" });
    }
};





export const findAndSaveFriends = async (req, res) => {
    const { username } = req.body;
 
    const user = await User.findOne({ username });

    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
    }

    try { 
        const followingUsers = fetchData(`${username}/following`);

        const followers = fetchData(`${username}/followers`);
 
        const mutualFollowers = followingUsers.filter(following =>
            followers.some(follower => follower.login === following.login)
        );
 
        user.friends = mutualFollowers.map(f => f.login);
        await user.save();

        res.status(200).json({ success: true, friends: mutualFollowers });
    } catch (error) {
        console.error("Error fetching mutual followers:", error);
        res.status(500).json({ success: false, message: "Error fetching mutual followers" });
    }
};




export const searchUsers = async (req, res) => {
    const { username, location } = req.query;

    try {
        const query = {};

        if (username) query.username = username;
        if (location) query.location = location;

        const users = await User.find(query);

        res.status(200).json({ success: true, users });
    } catch (error) {
        console.error("Error searching users:", error);
        res.status(500).json({ success: false, message: "Error searching users" });
    }
};





export const softDeleteUser = async (req, res) => {
    const { username } = req.params;

    try {
        const user = await User.findOneAndUpdate(
            { username },
            { deleted: true },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, message: "User soft deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ success: false, message: "Error deleting user" });
    }
};


export const updateUser = async (req, res) => {
    const { username } = req.params;
    const updates = req.body; // Fields to update

    try {
        const user = await User.findOneAndUpdate({ username }, updates, { new: true });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, message: "User updated successfully", user });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ success: false, message: "Error updating user" });
    }
};



export const getUsersSorted = async (req, res) => {
    const { sortBy } = req.query; 

    try {
        const users = await User.find().sort({ [sortBy]: -1 });

        res.status(200).json({ success: true, users });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ success: false, message: "Error fetching users" });
    }
};
