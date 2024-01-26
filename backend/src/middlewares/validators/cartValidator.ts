import { check } from "express-validator";
import validatorMiddeleware from "./validationResult";

export default {
    addToCartValidator: [
        check("productId").notEmpty().withMessage("productId is required"),
        validatorMiddeleware,
    ],

    updateCartValidator: [
        check("quantity").notEmpty().withMessage("quantity is required"),
        validatorMiddeleware,
    ],

};
