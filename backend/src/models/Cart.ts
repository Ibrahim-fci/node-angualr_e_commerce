import mongoose from "mongoose";

/**
 * @openapi
 * components:
 *  schemas:
 *    CartSchema:
 *      type: object
 *      required:
 *        - user
 *        - product
 *      properties:
 *        user:
 *          type: object
 *          $ref: '#/components/schemas/UserRegisterSchema'
 *        product:
 *          type: object
 *          $ref: '#/components/schemas/ProductSchema'
 * 
 *        quantity:
 *          type: integer
 *
 *
 */


const cartSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
        product: { type: mongoose.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 }
    },

);

export default mongoose.model("Cart", cartSchema);
