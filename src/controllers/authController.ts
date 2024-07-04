import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../model/userModel";

const register = async (req: Request, res: Response) => {
  const { name, email, password, age, Weight, height } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      age,
      Weight,
      height,
    });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    return res.status(201).json({ user, token });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign(
      {
        user: {
          id: user._id,
          email: user.email,
        },
      },
      process.env.JWT_SECRET!
    );
    return res.status(200).json({ user, token });
  } else {
    return res.status(401).json({ message: "Invalid email or password" });
  }
};

const edit = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, password, age, Weight, height } = req.body;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userUpdated = await User.updateOne(
      { _id: id },
      { $set: { name, email, password, age, Weight, height } }
    );

    return res
      .status(200)
      .json({ message: "User updated successfully", userUpdated });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const profile = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userDeleted = await User.deleteOne({ _id: id });
    return res
      .status(200)
      .json({ message: "User deleted successfully", userDeleted });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}
export { register, login, edit, profile, deleteUser };
