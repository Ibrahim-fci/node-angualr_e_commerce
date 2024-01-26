import jwt from "../../utils/jwt";
import expressAsyncHandelar from "express-async-handler";
import User from "../../models/User";
import rules from "../../utils/constants";

const authorize = expressAsyncHandelar(
  async (req: any, res: any, next: any) => {
    //CHECK IF THERE IS TOKEN IN THE HEADER
    if (!req.headers.authorization) {
      return res.status(403).json({ error: "No credentials sent!" });
    }

    const token = req.headers.authorization.split(" ")[1]; //GET TOKEN FROM REQUEST HEADER
    const { id, email } = await jwt.verifyAccessToken(token, res); //GET USER DATA FROM TOKEN

    //CHECK IF USER  EXISTED
    const user = await User.findOne({ _id: id });
    if (!user) return res.status(400).json({ msg: "user does not exist" });

    //RETURN USER DATA IN REQUEST.USER
    req.user = user;

    next();
  }
);





export { authorize };
