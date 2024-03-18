import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import PayloadError from "../errors/payloadError.js";
import AuthenticationError from "../errors/authenticationError.js";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  deadlines: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Deadline",
    },
  ],
});

function generateToken(userId, userName) {
  return jwt.sign({ id: userId, name: userName }, process.env.JWT_SECRET);
}

userSchema.statics.hashPassword = function hashPassword(password) {
  return bcrypt.hashSync(password, Number(process.env.SALT_ROUNDS));
};

userSchema.statics.checkPassword = function checkPassword(password, hash) {
  return bcrypt.compareSync(password, hash);
};

userSchema.statics.authenticate = function authenticate(token) {
  // Check if the provided token is valid
  try {
    jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    // Token is invalid
    throw new AuthenticationError("Invalid token");
  }

  return jwt.decode(token);
};

userSchema.methods.loginAndGenerateToken =
  async function loginAndGenerateToken() {
    const user = await User.findOne({ name: this.name });
    if (!user) {
      throw new AuthenticationError("Invalid username or password");
    }

    if (!User.checkPassword(this.password, user.password)) {
      throw new AuthenticationError("Invalid username or password");
    }

    return generateToken(user._id, this.name);
  };

userSchema.methods.register = async function register({sendToken = false}) {
  const duplicate = await User.findOne({ name: this.name });

  if (duplicate) {
    throw new PayloadError("User already exists");
  }

  this.password = User.hashPassword(this.password);

  const newUser = await this.save();

  if (sendToken) {
    return generateToken(newUser._id, this.name);
  } else {
    return newUser;
  }
};

export const User = mongoose.model("User", userSchema);
