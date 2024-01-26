import User from "../models/User";
import ApiError from "../utils/error";
import encrypt from "../utils/bcryptText";
import jwt from "../utils/jwt";

import expressAsyncHandler = require("express-async-handler");

export default {
  signup: expressAsyncHandler(async (req: any, res: any) => {
    const { email, password, firstName, lastName } = req.body;

    // @desc check if user exists before
    const user = await User.findOne({ email });
    if (user)
      return res.status(400).json({ error: new ApiError("this user existed before", 400) });


    // @desc create a new user
    const newUser = await User.create({
      email,
      firstName,
      lastName,
      password: await encrypt.encryptText(password)

    })

    res.status(201).json({ msg: "user created successfully" })

  }),

  signin: expressAsyncHandler(async (req: any, res: any) => {
    const { email, password } = req.body;

    // @desc get the user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: new ApiError("this user  not existed", 404) });


    // @desc compare password
    const comparedPassword = await encrypt.decryptText(password, user.password)
    if (!comparedPassword) return res.status(400).json({ error: new ApiError("invalid email or password", 400) });



    // @desc create user token
    const token = await jwt.generateAccessToken({ id: user._id, email: user.email })


    return res.status(200).json({ msg: "logged in correctly", token, isAdmin: user.isAdmin });


  }),

  getUser: expressAsyncHandler(async (req: any, res: any) => {
    let user = req.user;

    user = await user.toJSONWithoutPassword();

    return res.status(200).json({ user });

  })

}
