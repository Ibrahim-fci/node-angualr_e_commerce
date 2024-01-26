import mongoose from "mongoose";

/**
 * @openapi
 * components:
 *  schemas:
 *    CategorySchema:
 *      type: object
 *      required:
 *        - title
 *      properties:
 *        title:
 *          type: string
 *
 *
 */




const categorySchema = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true },
    },


);

export default mongoose.model("Category", categorySchema);
