import express from "express";
import { authorize } from "../middlewares/auth/auth";
import Validator from "../middlewares/validators/createCategory"
import CategoryController from "../controllers/Category.controller"

const router = express.Router()

/**
 * @openapi
 * '/categories/':
 *  post:
 *     tags:
 *      - Category
 *     description: add a new category by admin user
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          title: 
 *                              type: string
 *     responses:
 *          201:
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    msg:
 *                      type: string
 */

router.post("/", authorize, Validator.createCategoryValidator, CategoryController.create);






/**
 * @openapi
 * '/categories/':
 *  get:
 *     tags:
 *      - Category
 *     description: get All products
 *     responses:
 *          200:
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                      type: object
 *                      $ref: '#/components/schemas/CategorySchema' 
 */

router.get("/", CategoryController.getAll);







export default router;