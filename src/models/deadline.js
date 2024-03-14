import mongoose, { Types, ObjectId } from "mongoose";
import _ from "lodash";
import NotFoundError from "../errors/notFoundError.js";

const deadlineSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: false,
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
  await this.save();
  await User.findByIdAndUpdate(this.owner, {
    $push: { deadlines: this._id },
  });
};

deadlineSchema.statics.update = async function update(id, payload, issuer) {
  console.log(id);
  console.log(issuer);
  const deadline = await Deadline.findById(id);
  if (!deadline || deadline.owner.toString() !== issuer) {
    throw new NotFoundError("Deadline not found");
  }

  _.merge(deadline, _.omit(payload, ["_id", "__v", "owner"]));
  await deadline.save();

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
