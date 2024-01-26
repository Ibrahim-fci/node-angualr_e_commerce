import express from "express";
import { authorize } from "../middlewares/auth/auth";
import OrderController from "../controllers/Order.controller";

const router = express.Router()


router.get("/", authorize, OrderController.create);


router.get("/all/", authorize, OrderController.getAll);














export default router;