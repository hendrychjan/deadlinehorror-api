import { Router } from "express";

export const router = Router();

router.get("/", (req, res) => {
  res.send(`Running in ${process.env.NODE_ENV} mode.`);
});
