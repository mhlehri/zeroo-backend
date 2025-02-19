import bcrypt from "bcrypt";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUser } from "./user.interface";
import User from "./user.model";
import { createToken } from "../../utils/createToken";
import { JwtPayload } from "jsonwebtoken";
import config from "../../config";

//? service for adding user
export const createUserIntoDB = async (data: TUser) => {
  const user = await User.create(data);
  return user;
};

//? service for getting user
export const getUserFromDB = async (data: {
  email: string;
  password: string;
}) => {
  // console.log(data);
  //? check if user exists
  const user = await User.findOne({
    email: data.email,
  }).select("+password");

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  // console.log(user, "user");
  const match = await bcrypt.compare(data.password, user.password);
  // console.log(data?.password, "password", match);

  if (!match) {
    throw new AppError(httpStatus.NOT_FOUND, "Incorrect password");
  }

  const jwtPayload: JwtPayload = {
    id: user._id,
    role: user.role,
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
  };
  //? create a new token
  const token = createToken(jwtPayload, config.secret!, config.expiresIn!);

  const result = await User.findById(user._id);

  return { token, result };
};

//? service for getting all users
export const getAllUsersFromDB = async () => {
  const query = {
    // isDeleted: false,
  };
  const users = await User.find(query);
  const total = await User.countDocuments(query);
  return { users, total };
};

export const deleteUserByIdFormDB = async (id: string) => {
  const res = await User.deleteOne({ _id: id });
  return res;
};

export const getUserByIdFromDB = async (id: string) => {
  const res = await User.findById(id);
  return res;
};

export const updateUserByIdIntoDB = async (
  id: string,
  data: Partial<TUser>
) => {
  const res = await User.findByIdAndUpdate({ _id: id }, data, {
    new: true,
  });
  return res;
};
