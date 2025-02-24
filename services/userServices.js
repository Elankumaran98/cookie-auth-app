import User from "../models/userModel.js";

const getAllUsers = async () => {
  return User.find();
};

export default { getAllUsers };
