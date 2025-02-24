import express from "express";
import userControllers from "../controllers/userControllers.js";

const userRoutes = express.Router();

userRoutes.get("/", userControllers.getAllUsers);

export default userRoutes;
