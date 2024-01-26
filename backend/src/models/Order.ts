import mongoose from "mongoose";
import { OrderStatus } from "../utils/constants"

/**
 * @openapi
 * components:
 *  schemas:
 *    OrderSchema:
 *      type: object
 *      properties:
 *        products:
 *          type: array
 *          items:
 *              type: object
 *              $ref: '#/components/schemas/ProductSchema'
 *        status:
 *          type: string
 *          enum: [Pending, Processing, Shipped, Delivered, Canceled]
 *
 *
 */


const orderSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
        products: [
            {
                product: { type: mongoose.Types.ObjectId, ref: "Product" },
                quantity: { type: Number, required: true }
            }
        ],
        status: { type: String, enum: OrderStatus, default: OrderStatus[0] },
        timestamp: { type: Date, default: Date.now },
    },

);

export default mongoose.model("Order", orderSchema);
