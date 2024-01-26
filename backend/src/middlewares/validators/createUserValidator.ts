import { check } from "express-validator";
import validatorMiddeleware from "./validationResult";

export default {
  createUserValidator: [
    check("email").isEmail().withMessage("Invalid email format"),
    check("firstName").notEmpty().withMessage("first name is required"),
    check("lastName").notEmpty().withMessage("last name is required"),
    check("password").notEmpty().withMessage("password is required"),

    validatorMiddeleware,
  ],

  loginValidator: [
    check("email").isEmail().withMessage("Invalid email format"),
    check("password").notEmpty().withMessage("password  is required"),

    validatorMiddeleware,
  ],
};
