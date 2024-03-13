import { User } from "../models/user.js";

export const auth = async (req, res, next) => {
  try {
    req.user = await User.authenticate(req.headers["x-auth-token"]);
    next();
  } catch (e) {
    return res.status(401).send("Unauthorized");
  }
};
