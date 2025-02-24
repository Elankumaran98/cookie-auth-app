import userService from "../services/userServices.js";
import asyncHandler from "../middleware/asyncHandler.js";

const getAllUsers = asyncHandler(async (_req, res) => {
  const users = await userService.getAllUsers();
  res.json(users);
});

export default { getAllUsers };
