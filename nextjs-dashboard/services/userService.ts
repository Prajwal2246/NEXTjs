import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

interface SignUpInputs {
  username: string;
  email: string;
  password: string;
}

interface LoginInputs {
  email: string;
  password: string;
}
const login = async ({ email, password }: LoginInputs) => {
  // checking user exist in our db or not
  const user = await User.findOne({ email });
  if (!user) throw new Error("user doesnot exist");

  //chekcing password
  const decryptPassword = await bcrypt.compare(password, user.password);
  if (!decryptPassword) throw new Error("incorrect password");

  //create a token
  const tokenData = {
    id: user._id,
    username: user.username,
    email: user.email,
  };

  const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
    expiresIn: "1d",
  });

  //seting cookies
  const response = NextResponse.json({
    message: "login succesfull",
    success: true,
  });
  response.cookies.set("token", token, {
    httpOnly: true,
    secure: true,
  });

  return response;
};

const signup = async ({ username, email, password }: SignUpInputs) => {
  if (!username) throw new Error("username cannot be empty");
  if (!email) throw new Error("email cannot be empty");
  if (!password) throw new Error("password cannot be empty");

  //checking user exist or not
  const user = await User.findOne({ email });
  if (user) throw new Error("user already exist");

  //hashing the password
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  const userObj = newUser.toObject();
  delete userObj.password;
  return userObj;
};

const logout = async () => {
  const response = NextResponse.json({
    message: "logout success",
  });
  response.cookies.delete("token");
  return response;
};

export default { signup, login, logout };
