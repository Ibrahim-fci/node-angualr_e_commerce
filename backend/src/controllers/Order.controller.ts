import Cart from "../models/Cart";
import Order from "../models/Order";
import User from "../models/User";
import ApiError from "../utils/error";

import expressAsyncHandler = require("express-async-handler");

export default {
    create: expressAsyncHandler(async (req: any, res: any) => {
        const auth_user = req.user;
        let product_list = []


        //@desc get user cart
        const user = await User.findOne({ _id: auth_user._id }).populate("cart");
        if (!user) return res.status(404).json({ error: new ApiError("user not found", 404) })
        let cartItems: any = user?.cart
        if (cartItems) {
            for (let cart of cartItems) {
                product_list.push({
                    product: cart.product,
                    quantity: cart.quantity
                })
            }

        }

        if (product_list.length < 1) return res.status(400).json({ error: new ApiError("cart is empty", 400) })


        // @desc create new order
        const newOrder = await Order.create({
            user: auth_user._id,
            products: product_list
        })


        // @desc delete user cart
        await Cart.deleteMany({ user: auth_user._id })


        // @desc update user cart
        user.cart = []
        await user.save()


        // @desc update product stock
        // for (let cart of cartItems) {
        //     const product = await Product.findById(cart.product)
        //     if (product) {
        //         product.stock = product.stock - cart.quantity
        //         await product.save()
        //     }
        // }

        // @des push order to user orders
        auth_user.orders.push(newOrder._id)
        await auth_user.save()




        return res.status(200).json({ msg: "order created successfully", order: newOrder })

    }),

    getAll: expressAsyncHandler(async (req: any, res: any) => {

        const user = req.user;

        // @desc get user orders
        const orders = await Order.find({ user: user._id }).populate("products.product")

        return res.status(200).json({ orders })

    }),

}
