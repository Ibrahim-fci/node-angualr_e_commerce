import mongoose from "mongoose";

/**
 * @openapi
 * components:
 *  schemas:
 *    RatingSchema:
 *      type: object
 *      required:
 *        - rate
 *      properties:
 *        comment:
 *          type: string
 *        rate:
 *          type: integer
 *
 *
 */




const ratingSchema = new mongoose.Schema(
    {
        comment: { type: String },
        rate: { type: Number, required: true },
        user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
        product: { type: mongoose.Types.ObjectId, ref: "Product", required: true },
    },

);

export default mongoose.model("Rate", ratingSchema);
