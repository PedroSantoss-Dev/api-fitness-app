import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../model/userModel";

const register = async (req: Request, res: Response) => {
  const { name,email, password, age, Weight, height } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({name, email, password, age, Weight, height });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
        expiresIn: '1h',
      });
  
      
    return res.status(201).json({ user, token });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export {register}