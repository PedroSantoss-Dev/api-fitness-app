import { Request, Response } from "express";
import Exercise from "../model/exerciseModel";
import Category from "../model/categories";


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
const getExercises = async(req: Request, res: Response) => {
  try {
    const exercises = await Exercise.find().populate('category');
    return res.status(200).json({ exercises });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}
const getExerciseById = async(req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const exercise = await Exercise.findById(id);
    if (!exercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }
    return res.status(200).json({ exercise });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

const category = async(req: Request, res: Response) => {
  const {name} = req.body;
  try {
    const categoryExists = await Category.findOne({ name });
    if (categoryExists) {
      return res.status(400).json({ message: "Category already exists" });
    }
    const category = await Category.create({
      name
    })
    return res.status(201).json({ category });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

const getExercisesByCategory = async(req: Request, res: Response) => {
  try{
    const exercises = await Exercise.find().populate('category');
    
    return res.status(200).json({ exercises });
  }catch(error){
    return res.status(500).json({ error: "Internal server error" });
  }
}

export { RegisterExercise, getExercises, getExerciseById, category ,getExercisesByCategory }