import mongoose from "mongoose";
import bycrypt from "bcrypt";
import validator from "validator";

const Scheme = mongoose.Schema;

const userScheme = new Scheme({
  email: {
    require: true,
    type: String,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  sellerID: {
    type: String,
    require: true,
    unique: true,
  },
});

//static suignup method(create(),findOne() vage Model ekata call karanna puluwm method ekak create karanawa)
//also we must use a regular function here because we need to use this keyword
userScheme.statics.signup = async function (email, password) {
  //validation
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  }

  const exist = await this.findOne({ email });

  if (exist) {
    throw new Error("Email already exist");
  }

  const salt = await bycrypt.genSalt(10);
  const hash = await bycrypt.hash(password, salt);

  const sellerCount = await this.countDocuments({
    sellerID: { $regex: /^SId/i },
  });

  const sellerID = `SId${(sellerCount + 1).toString().padStart(4, "0")}`;

  const user = await this.create({ email, password: hash, sellerID });

  return user;
};

//static login method
userScheme.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw new Error("incorect email");
  }

  const match = await bycrypt.compare(password, user.password);

  if (!match) {
    throw new Error("incorect password");
  }
  return user;
};
const User = mongoose.model("User", userScheme);
export default User;
