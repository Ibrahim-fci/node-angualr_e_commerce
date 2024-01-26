import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";
import swaggerUI from "swagger-ui-express";
import bodyParser from "body-parser"
import path from "path";

dotenv.config();

// @desc Routers  
import UserRouter from "./routes/userRouter";
import categoryRouter from "./routes/categoryRouter";
import productRouter from "./routes/productRouter";
import cartRouter from "./routes/cartRouter";
import orderRouter from "./routes/orderRouter";

import connectDB from "./utils/connectDB";
import globalError from "./middlewares/gloabal-error";
import swaggerDocs from "./utils/swagger";
// import * as options from "./swaagerDocs.json";

const app = express();
const PORT = process.env.PORT || 5000;
const dbUrl = process.env.URL?.toString();

// @desc middlewares
app.use(cors({ origin: "*" }));
app.use(morgan("tiny"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../uploads")));


// @desc Routes
app.use("/auth", UserRouter);
app.use("/categories", categoryRouter);
app.use("/products", productRouter);
app.use("/cart", cartRouter);
app.use("/orders", orderRouter);


//swagger Docs
swaggerDocs(app, PORT);

// @desc DB connetion func
connectDB(dbUrl);

// @desc handel gloabal errors
app.use(globalError);

app.listen(PORT, async () => {
  console.log(`server running on port ${PORT}`);
});
