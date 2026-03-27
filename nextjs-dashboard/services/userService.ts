import User from "@/models/userModel";
import bcrypt from "bcryptjs";

interface SignUpInputs {
  username: string;
  email: string;
  password: string;
}

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

export default { signup };
