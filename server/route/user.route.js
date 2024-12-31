import express from "express";
import { saveUserData , searchUsers , updateUser,getUsersSorted } from "../controller/user.controller.js";

const router = express.Router();

router.post("/save", saveUserData);
router.get("/search", searchUsers);
router.put("/update/:username", updateUser);
router.get("/sorted", getUsersSorted);

export default router;


