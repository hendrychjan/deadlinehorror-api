import { Router } from "express";
import { auth } from "../middleware/auth.js";

export const router = Router();

router.get("/", (req, res) => {
  res.send(`Running in ${process.env.NODE_ENV} mode.`);
});

router.get("/auth", auth, (req, res) => {
  res.send(`Authenticated user ${req.user.name}`);
});
