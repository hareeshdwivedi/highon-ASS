import express from "express";
import { addMessage, getMessages } from "../controllers/messageController.js";

const router = express.Router();

router.route("/addmsg").post(addMessage);
router.route("/getmsgs").post(getMessages);

export default router;
