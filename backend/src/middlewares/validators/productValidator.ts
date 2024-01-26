import { check } from "express-validator";
import validatorMiddeleware from "./validationResult";

export default {
    createProductValidator: [
        check("title").notEmpty().withMessage("title is required"),
        check("description").notEmpty().withMessage("description is required"),
        check("price").isNumeric().withMessage("price is required"),
        check("categoryId").notEmpty().withMessage("categoryId is required"),
        validatorMiddeleware,
    ],

    UpdateProductValidator: [
        check("title").isString().optional(),
        check("description").isString().optional(),
        check("price").isNumeric().optional(),
        check("dicount").isNumeric().optional(),
        check("stock").isNumeric().optional(),
        check("categoryId").isString().optional(),
        validatorMiddeleware,
    ],

};
