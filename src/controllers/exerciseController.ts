import { Request, Response } from "express";
import Exercise from "../model/exerciseModel";


const RegisterExercise = async(req: Request, res: Response) => {
  const {name, description, image, category } = req.body;
  try {
    const exerciseExists = await Exercise.findOne({ name });

    if (exerciseExists) {
      return res.status(400).json({ message: "Exercise already exists" });
    }
    
    const exercise = await Exercise.create({
      name,
      description,
      image,
      category
    });

    return res.status(201).json({ exercise });
    
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

export { RegisterExercise }