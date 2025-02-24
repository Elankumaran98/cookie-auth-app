import express from "express";

import authController from "../controllers/authControllers.js";
import validate from "../middleware/validate.js";
import authValidator from "../validators/authValidator.js";

const authRoutes = express.Router();

authRoutes.post(
  "/register",
  authValidator.registrationSchema,
  validate,
  authController.register
);
authRoutes.post(
  "/login",
  authValidator.loginSchema,
  validate,
  authController.login
);
authRoutes.post("/refresh-token", authController.refreshToken);

export default authRoutes;
