import mongoose from "mongoose";
import Cart from "./Cart"

/**
 * @openapi
 * components:
 *  schemas:
 *    UserRegisterSchema:
 *      type: object
 *      required:
 *        - firstName
 *        - lastName
 *        - email
 *        - password
 *      properties:
 *        firstName:
 *          type: string
 *        lastName:
 *          type: string
 *        email:
 *           type: string
 *           example: ibrahim@gmail.com
 *        password:
 *            type: string
 *
 *
 */

/**
 * @openapi
 * components:
 *  schemas:
 *    UserLoginSchema:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *           type: string
 *           example: ibrahim@gmail.com
 *        password:
 *            type: string
 *
 */


const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },

    orders: [{ type: mongoose.Types.ObjectId, ref: "Order" }],
    cart: [{ type: mongoose.Types.ObjectId, ref: "Cart" }]
  },

);

// Define a method to return a user without the password field
userSchema.methods.toJSONWithoutPassword = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};



export default mongoose.model("User", userSchema);
