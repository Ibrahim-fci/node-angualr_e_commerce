import { check } from "express-validator";
import Cart from "../models/Cart";
import Product from "../models/Product"
import ApiError from "../utils/error";

import expressAsyncHandler = require("express-async-handler");

export default {
    add: expressAsyncHandler(async (req: any, res: any) => {
        const { productId, quantity } = req.body;
        const user = req.user;

        // check if product existed

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ error: new ApiError("product not found", 404) });

        // check if product is in stock
        if (quantity > product.stock) return res.status(400).json({ error: new ApiError("product out of stock", 400) })

        // check if this product existed before in the user cart
        const cart = await Cart.findOne({ user: user._id, product: productId })
        if (cart) return res.status(400).json({ error: new ApiError("product already in the cart", 400) })

        // create new cart
        const newCart = await Cart.create({
            user: user._id,
            product: productId,
            quantity: quantity ? quantity : 1
        })

        // add cart to user cart
        user.cart.push(newCart._id)
        await user.save()

        // decrease product stock
        product.stock = product.stock - quantity
        await product.save()

        return res.status(200).json({ msg: "product added successfully", cart: newCart })


    }),

    getCartItems: expressAsyncHandler(async (req: any, res: any) => {
        const user = req.user;

        // @desc get user cart
        const cart = await Cart.find({ user: user._id }).populate("product")

        // count total price
        let totalPrice = 0
        cart.forEach((cartItem: any) => {
            totalPrice += cartItem.quantity * cartItem.product.price
        })

        return res.status(200).json({ cart, totalPrice })

    }),


    update: expressAsyncHandler(async (req: any, res: any) => {
        let { quantity } = req.body;
        const user = req.user;
        const cartId = req.params.id;
        quantity = parseInt(quantity)

        // @desc check is cart existed

        const cart = await Cart.findById(cartId).populate("product");
        if (!cart) return res.status(404).json({ error: new ApiError("cart not found", 404) });


        // @desc check is product existed
        const product = await Product.findById(cart.product);
        if (!product) return res.status(404).json({ error: new ApiError("product not found", 404) });


        // @desc check if product is in stock


        let quantityDiference = Math.abs(quantity - cart.quantity)

        // update product stock
        if (quantity > cart.quantity) {
            if (product.stock < (quantityDiference)) return res.status(400).json({ error: new ApiError("product out of stock", 400) })
            product.stock = product.stock - quantityDiference
        } else {
            product.stock = product.stock + quantityDiference
        }

        await product.save()

        // @desc update cart
        cart.quantity = quantity
        await cart.save()

        return res.status(200).json({ msg: "cart updated successfully", cart })


    }),


    delete: expressAsyncHandler(async (req: any, res: any) => {
        const user = req.user;
        const cartId = req.params.id;

        // @desc check if cart existed

        const cart = await Cart.findById(cartId);
        if (!cart) return res.status(404).json({ error: new ApiError("cart not found", 404) });

        // @desc check if the cart user equal to user
        if (cart.user != user.id) return res.status(403).json({ error: new ApiError("you are not allowed to delete this cart", 403) });


        // @desc remove cart id from user cart list
        user.cart = user.cart.filter((cartId: any) => cartId != cart._id)
        await user.save()

        // update cart product stock
        const product = await Product.findById(cart.product)
        if (product) {
            product.stock = product.stock + cart.quantity
            await product.save()
        }



        // @desc delete cart
        await cart.deleteOne()
        return res.status(200).json({ msg: "cart item deleted successfully" })
    }),





}
