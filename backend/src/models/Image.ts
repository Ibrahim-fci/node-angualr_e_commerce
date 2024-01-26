import mongoose from "mongoose";

/**
 * @openapi
 * components:
 *  schemas:
 *    ImageSchema:
 *      type: object
 *      required:
 *        - url
 *        - product
 *      properties:
 *        product:
 *          type: object
 *          $ref: '#/components/schemas/ProductSchema'
 * 
 *        url:
 *          type: string
 *
 *
 */


const imageSchema = new mongoose.Schema(
    {
        product: { type: mongoose.Types.ObjectId, ref: "Product", required: true },
        url: { type: String, required: true }
    },

);

export default mongoose.model("Image", imageSchema);
