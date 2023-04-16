import express from "express";
import {
  getAllUsers,
  userRegister,
  getSingleUser,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/").post(userRegister);
router.route("/all/:id").get(getAllUsers);
router.route("/:id").get(getSingleUser);

export default router;
