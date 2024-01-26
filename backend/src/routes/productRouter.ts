import express from "express";
import { authorize } from "../middlewares/auth/auth";
import Validator from "../middlewares/validators/productValidator"
import ProductController from "../controllers/Product.controller"
import multer from "multer"
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext)
    }
})

const upload = multer({ storage: storage })

const router = express.Router()

/**
 * @openapi
 * '/products/':
 *  post:
 *     tags:
 *      - Product
 *     description: add a new product by admin user
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                     $ref: '#/components/schemas/ProductSchema'
 *     responses:
 *          201:
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    msg:
 *                      type: string
 *                      example: product created successfully
 */

router.post("/", authorize, upload.array('files', 5), Validator.createProductValidator, ProductController.create);




/**
 * @openapi
 * '/products/{id}':
 *  put:
 *     tags:
 *      - Product
 *     description: update a  product by admin user
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           required: true
 *           description: product id
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                     $ref: '#/components/schemas/ProductSchema'
 *     responses:
 *          200:
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    msg:
 *                      type: string
 *                      example: product updated successfully
 *                    updatedProduct:
 *                      type: object
 *                      $ref: '#/components/schemas/ProductSchema'
 */

router.put("/:id", authorize, upload.array('files', 5), Validator.UpdateProductValidator, ProductController.update);




/**
 * @openapi
 * '/products/{id}':
 *  delete:
 *     tags:
 *      - Product
 *     description: delete a  product by admin user
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *          type: string
 *          required: true
 *          description: product id
 *     responses:
 *          200:
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    msg:
 *                      type: string
 *                      example: product deleted successfully
 */

router.delete("/:id", authorize, ProductController.delete);




/**
 * @openapi
 * '/products/?page=1&pageSize=100':
 *  get:
 *     tags:
 *      - Product
 *     description: get All products
 *     responses:
 *          200:
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                      type: object
 *                      $ref: '#/components/schemas/ProductSchema' 
 */

router.get("/", ProductController.getAll);







/**
 * @openapi
 * '/products/{id}':
 *  get:
 *     tags:
 *      - Product
 *     description: get a product by its id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *          type: string
 *          required: true
 *          description: product id
 *     responses:
 *          200:
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    product:
 *                      type: object
 *                      $ref: '#/components/schemas/ProductSchema' 
 */

router.get("/:id", ProductController.getOne);










router.post("/filter/", ProductController.filter);


router.post("/search/", ProductController.search);


export default router;