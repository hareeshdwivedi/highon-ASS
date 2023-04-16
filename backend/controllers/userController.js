import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";

const userRegister = async (req, res) => {
  const { username, email, avatarImage } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    res.json(user);
  } else {
    const user = await User.create({
      username,
      email,
      avatarImage,
    });
    return res.status(StatusCodes.OK).json(user);
  }
};

const getAllUsers = async (req, res) => {
  const allUsers = await User.find({ _id: { $ne: req.params.id } }).select([
    "_id",
    "username",
    "email",
    "avatarImage",
  ]);
  return res.status(StatusCodes.OK).json(allUsers);
};

const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select([
    "_id",
    "username",
    "email",
    "avatarImage",
  ]);

  if (user) {
    return res.status(StatusCodes.OK).json(user);
  }
  return res.json({ msg: "something went wrong!" });
};
export { userRegister, getAllUsers, getSingleUser };
