import express from "express";
import { authorize } from "../middlewares/auth/auth";
import CartController from "../controllers/Cart.controller"
import Validator from "../middlewares/validators/cartValidator"

const router = express.Router()

/**
 * @openapi
 * '/cart/':
 *  post:
 *     tags:
 *      - Cart
 *     description: add a new category by admin user
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          productId: 
 *                              type: string
 *                          quantity:
 *                              type: integer
 *     responses:
 *          201:
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    cart:
 *                      type: object
 *                      $ref: '#/components/schemas/CartSchema'
 */

router.post("/", authorize, Validator.addToCartValidator, CartController.add);



/**
 * @openapi
 * '/cart/':
 *  get:
 *     tags:
 *      - Cart
 *     description: get user Cart
 *     responses:
 *          200:
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                      type: object
 *                      $ref: '#/components/schemas/CartSchema' 
 */
router.get("/", authorize, CartController.getCartItems);




/**
 * @openapi
 * '/cart/{id}':
 *  put:
 *     tags:
 *      - Cart
 *     description: update product quantity in user Cart
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *          type: string
 *          required: true
 *          description: cart id
 *     responses:
 *          200:
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                   type: object
 *                   $ref: '#/components/schemas/CartSchema' 

 */
router.put("/:id", authorize, Validator.updateCartValidator, CartController.update);



/**
 * @openapi
 * '/cart/{id}':
 *  delete:
 *     tags:
 *      - Cart
 *     description: Delete cart item
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *          type: string
 *          required: true
 *          description: cart item id
 *     responses:
 *          200:
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    msg:
 *                      type: string
 *                      example: cart item deleted successfully
 */

router.delete("/:id", authorize, CartController.delete);


//
export default router;