import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";

//@description     Get or Search all users
//@route           GET /api/chatUser?search=
//@access          Public
export const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { username: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({
    _id: { $ne: req.user.id },
  });
  res.send(users);
});
