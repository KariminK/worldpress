import { body } from "express-validator";

const validateSignIn = [
  body("username")
    .isLength({ min: 3, max: 20 })
    .withMessage("Username must have between 3 and 20 characters"),
  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .isStrongPassword()
    .withMessage(
      "Password must have at least one: special character, uppercase letter, lowercase letter, number and must have at least 8 characters"
    ),
];

export default validateSignIn;
