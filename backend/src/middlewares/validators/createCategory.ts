import { check } from "express-validator";
import validatorMiddeleware from "./validationResult";

export default {
    createCategoryValidator: [
        check("title").notEmpty().withMessage("title is required"),
        validatorMiddeleware,
    ],

};
