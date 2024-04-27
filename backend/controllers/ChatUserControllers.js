import asyncHandler from "express-async-handler";
import chatUser from "../models/chatuserModel.js";

//@description     Get or Search all users
//@route           GET /api/chatUser?search=
//@access          Public
export const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await chatUser
    .find(keyword)
    .find({ _id: { $ne: req.chatUser._id } });
  res.send(users);
});
