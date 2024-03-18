import { Router } from "express";
import { User } from "../models/user.js";

export const router = Router();

router.post("/register", async (req, res, next) => {
  try {
    const user = new User(req.body);
    const registered = await user.register({
      sendToken: req.query.sendToken.toString() === "true",
    });
    res.status(201).send(registered);
  } catch (e) {
    next(e); // Error sink
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const user = new User(req.body);
    const token = await user.loginAndGenerateToken();
    res.status(200).send(token);
  } catch (e) {
    next(e); // Error sink
  }
});
