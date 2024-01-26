import Category from "../models/Category";
import ApiError from "../utils/error";

import expressAsyncHandler = require("express-async-handler");

export default {
    create: expressAsyncHandler(async (req: any, res: any) => {
        const { title } = req.body;
        const user = req.user;

        // @desc check if user is admin
        if (!user.isAdmin) return res.status(403).json({ error: new ApiError("Admins only can add category", 403) })

        // @desc check if category existed before
        const category = await Category.findOne({ title });
        if (category) return res.status(400).json({ error: new ApiError("category with this name already existed", 400) })


        // @create a new category
        const newCategory = await Category.create({
            title
        })


        return res.status(201).json({ msg: "category created successfully" })

    }),

    getAll: expressAsyncHandler(async (req: any, res: any) => {

        // @desc check if category existed before
        const categories = await Category.find({});

        return res.status(200).json({ categories })

    }),

}
