import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from "bcrypt";

const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    role: { type: String, default: "user", enum: ["admin", "user"] },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  // console.log(this.password);
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const User = model<TUser>("User", userSchema);

export default User;
