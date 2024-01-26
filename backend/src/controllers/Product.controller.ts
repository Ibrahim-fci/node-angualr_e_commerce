import { query } from "express";
import Category from "../models/Category";
import Product from "../models/Product";
import Image from "../models/Image";
import ApiError from "../utils/error";
import dotenv from "dotenv";
dotenv.config();

const Host = process.env.HOST




import expressAsyncHandler = require("express-async-handler");
import { Types } from "mongoose";

export default {
    create: expressAsyncHandler(async (req: any, res: any) => {
        const { title, description, price, dicount, stock, categoryId } = req.body;
        const user = req.user;
        const files = req.files;



        // @desc check if user is admin
        if (!user.isAdmin) return res.status(403).json({ error: new ApiError("Admins only can add Product", 403) })



        // @desc check is category existed or not
        const category = await Category.findById(categoryId);
        if (!category) return res.status(404).json({ error: new ApiError("category not existed", 404) });



        // @desc create a new product
        const product = await Product.create({
            title, description, price, dicount, stock, category: categoryId, user: user._id
        })


        // add product images in Image model
        const images = await Image.insertMany(handleListImages(files, product._id))

        // add images in product images arry
        for (let item of images) {
            product.images.push(item.url)
        }
        product.save()





        return res.status(201).json({ msg: "product created successfully", product })

    }),


    update: expressAsyncHandler(async (req: any, res: any) => {
        const { title, description, price, dicount, stock, categoryId } = req.body;
        const user = req.user;
        const productId = req.params.id;
        const files = req.files;
        const imageUrls = []


        console.log(req.body)

        // @desc check if user is admin
        if (!user.isAdmin) return res.status(403).json({ error: new ApiError("Admins only can update Product", 403) })

        // @desc check is product existed or not
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ error: new ApiError("product not existed", 404) });


        // @desc check is category existed or not
        if (categoryId) {
            const category = await Category.findById(categoryId);
            if (!category) return res.status(404).json({ error: new ApiError("category not existed", 404) });
        }



        // add product images in Image model
        const images = await Image.insertMany(handleListImages(files, product._id))

        // add images in product images arry
        for (let item of images) {
            imageUrls.push(item.url)
        }




        // @desc update a product
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            {
                $set: {
                    title: title ? title : product.title,
                    description: description ? description : product.description,
                    price: price ? price : product.price,
                    dicount: dicount ? dicount : product.dicount,
                    stock: stock ? stock : product.stock,
                    category: categoryId ? categoryId : product.category,
                    images: imageUrls.length ? imageUrls : product.images

                },
            },
            { new: true }
        )

        await updatedProduct?.save()


        return res.status(200).json({ msg: "product updated successfully", updatedProduct })

    }),



    delete: expressAsyncHandler(async (req: any, res: any) => {
        const user = req.user;
        const productId = req.params.id;

        // @desc check if user is admin
        if (!user.isAdmin) return res.status(403).json({ error: new ApiError("Admins only can delete Product", 403) })

        // @desc check is product existed or not
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ error: new ApiError("product not existed", 404) });


        // @desc delete a  product
        await Product.deleteOne({ _id: product._id })


        return res.status(200).json({ msg: "product deleted successfully" })

    }),

    getAll: expressAsyncHandler(async (req: any, res: any) => {
        let { page, pageSize } = req.query

        page = page ? page : 1
        pageSize = pageSize ? pageSize : 10


        // Calculate the number of documents to skip
        const skip = (page - 1) * pageSize;



        // @desc get all products
        const productsNum: number = await Product.countDocuments({})
        const products = await Product.find({}).populate('category').skip(skip)
            .limit(pageSize)
            .exec()

        return res.status(200).json({ products, pages: Math.ceil(productsNum / pageSize) || 1 })

    }),

    getOne: expressAsyncHandler(async (req: any, res: any) => {

        const productId = req.params.id

        // @desc get the product by id
        const product = await Product.findById(productId).populate('category')
        if (!product) return res.status(404).json({ error: new ApiError("product not found", 404) });

        return res.status(200).json({ product })

    }),

    filter: expressAsyncHandler(async (req: any, res: any) => {
        let { category, page, pageSize } = req.body

        page = page ? page : 1
        pageSize = pageSize ? pageSize : 10

        // Calculate the number of documents to skip
        const skip = (page - 1) * pageSize;

        let productsNum: number = 0
        let products: any;

        // check is category existed
        const categoryExisted = await Category.findById(category);
        if (!categoryExisted) return res.status(404).json({ error: new ApiError("category not found", 404) });


        if (categoryExisted.title === "all") {
            productsNum = await Product.countDocuments({})
            console.log(productsNum, "%%%%%%%%%%%%%%%%%%%%%%%")
            products = await Product.find({}).populate('category').skip(skip)
                .limit(pageSize)
                .exec()

            return res.status(200).json({ products, pages: Math.ceil(productsNum / pageSize) || 1 })
        }

        productsNum = await Product.find({ category: categoryExisted }).count()
        products = await Product.find({ category: category }).populate('category').skip(skip)
            .limit(pageSize)
            .exec()
        return res.status(200).json({ products: products, pages: Math.ceil(productsNum / pageSize) || 1 })


    }),

    search: expressAsyncHandler(async (req: any, res: any) => {
        let title = new String(req.body.title).toLowerCase()

        const productsNum: number = await Product.countDocuments({ title: { $regex: title, $options: "i" } })
        const products = await Product.find({ title: { $regex: title, $options: "i" } }).populate('category')
        return res.status(200).json({ products, pages: Math.ceil(productsNum / 10) || 1 })
    }),

}


// helper func
function handleListImages(imagesList: any, productID: any) {
    let temp = []
    for (let item of imagesList) {
        temp.push({ product: productID, url: `${Host}${item.filename}` })
    }

    return temp;
}
