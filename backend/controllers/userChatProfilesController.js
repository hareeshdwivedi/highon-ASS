import { StatusCodes } from "http-status-codes";
import UserProfiles from "../models/userChatProfilesModel.js";

const addNewProfileToUser = async (req, res) => {
  const { sender, newProfileId } = req.body;

  const user = await UserProfiles.findById({ _id: sender._id });
  if (user?.profiles) {
    if (user.profiles.includes(newProfileId)) {
      return res
        .status(StatusCodes.OK)
        .json({ msg: "already user profiles is present" });
    }
  }
  const data = await UserProfiles.updateOne(
    { _id: sender._id },
    {
      $push: {
        profiles: {
          $each: [newProfileId],
        },
      },
    },
    {
      new: true,
      upsert: true,
    }
  );
  await UserProfiles.updateOne(
    { _id: newProfileId._id },
    {
      $push: {
        profiles: {
          $each: [
            {
              avatarImage: sender.picture,
              email: sender.email,
              username: sender.name,
              _id: sender._id,
            },
          ],
        },
      },
    },
    {
      new: true,
      upsert: true,
    }
  );
  return res
    .status(StatusCodes.OK)
    .json({ msg: "Added user profile successfully" });
};

const getUserChattedProfiles = async (req, res) => {
  const data = await UserProfiles.findOne({ _id: req.params.id });

  if (data) {
    return res.status(StatusCodes.OK).json({ data: data.profiles, msg: "OK" });
  }
  return res.json({ data: [], msg: "unable to fetch data" });
};

export { addNewProfileToUser, getUserChattedProfiles };
