import mongoose from "mongoose";
import _ from "lodash";
import { User } from "./user.js";
import NotFoundError from "../errors/notFoundError.js";
import PayloadError from "../errors/payloadError.js";

const deadlineSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: false,
  },
  assignedDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

deadlineSchema.methods.create = async function create() {
  try {
    await this.save();
  } catch (e) {
    throw new PayloadError(e.message);
  }
  await User.findByIdAndUpdate(this.owner, {
    $push: { deadlines: this._id },
  });
};

deadlineSchema.statics.update = async function update(id, payload, issuer) {
  const deadline = await Deadline.findById(id);
  if (!deadline || deadline.owner.toString() !== issuer) {
    throw new NotFoundError("Deadline not found");
  }

  _.merge(deadline, _.omit(payload, ["_id", "__v", "owner"]));
  
  try {
    await deadline.save();
  } catch (e) {
    throw new PayloadError(e.message);
  }

  return deadline;
};

deadlineSchema.statics.delete = async function del(id, issuer) {
  const deadline = await Deadline.findById(id);
  if (!deadline || deadline.owner.toString() !== issuer) {
    throw new NotFoundError("Deadline not found");
  }

  await Deadline.findByIdAndDelete(id);
};

export const Deadline = mongoose.model("Deadline", deadlineSchema);
