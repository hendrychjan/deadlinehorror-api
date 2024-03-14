import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { validateId } from "../middleware/validateId.js";
import { User } from "../models/user.js";
import { Deadline } from "../models/deadline.js";

export const router = Router();

router.get("/", auth, async (req, res) => {
  console.log(req.user.id);
  const user = await User.findById(req.user.id).populate("deadlines");
  console.log(user);
  res.send(user.deadlines ?? []);
});

router.post("/", auth, async (req, res, next) => {
  try {
    req.body.owner = req.user.id;
    const deadline = new Deadline(req.body);
    await deadline.create();
    res.status(201).send(deadline);
  } catch (e) {
    next(e); // Error sink
  }
});

router.patch("/:id", [validateId, auth], async (req, res, next) => {
  try {
    const updated = await Deadline.update(req.params.id, req.body, req.user.id);
    res.send(updated);
  } catch (e) {
    next(e); // Error sink
  }
});

router.delete("/:id", [validateId, auth], async (req, res, next) => {
  try {
    await Deadline.delete(req.params.id, req.user.id);
    res.send("Deadline deleted");
  } catch (e) {
    next(e); // Error sink
  }
});
