import express from "express";
import {
  addNewProfileToUser,
  getUserChattedProfiles,
} from "../controllers/userChatProfilesController.js";

const router = express.Router();

router.route("/").put(addNewProfileToUser);
router.route("/:id").get(getUserChattedProfiles);

export default router;
