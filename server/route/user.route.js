import express from "express";
import { saveUserData , searchUsers , updateUser,getUsersSorted, softDeleteUser, findAndSaveFriends } from "../controller/user.controller.js";

const router = express.Router();

router.post("/save", saveUserData);
router.get("/search", searchUsers);
router.get("/mutual",findAndSaveFriends)
router.put("/delete:username",softDeleteUser)
router.put("/update/:username", updateUser);
router.get("/sorted", getUsersSorted);

export default router;


