import { body } from "express-validator";

const registrationSchema = [
  body("username")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long")
    .trim()
    .escape(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .trim()
    .escape(),
];

const loginSchema = [
  body("username").exists().withMessage("Username is required").trim().escape(),
  body("password").exists().withMessage("Password is required").trim().escape(),
];

export default { registrationSchema, loginSchema };
