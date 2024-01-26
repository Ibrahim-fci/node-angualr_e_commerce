import mongoose from "mongoose";

/**
 * @openapi
 * components:
 *  schemas:
 *    ProductSchema:
 *      type: object
 *      required:
 *        - title
 *        - description
 *        - price
 *      properties:
 *        title:
 *          type: string
 *        description:
 *          type: string
 *        price:
 *           type: integer
 *        stock:
 *            type: integer
 *        discount:
 *            type: integer
 *
 *
 */


const productSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        dicount: { type: Number, default: 0 },
        stock: { type: Number, default: 0 },
        timestamp: { type: Date, default: Date.now },
        category: {
            type: mongoose.Types.ObjectId,
            ref: "Category"
        },
        images: [{ type: String }],
        user: { type: mongoose.Types.ObjectId, ref: "User" },
    },


);

export default mongoose.model("Product", productSchema);
