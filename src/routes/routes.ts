import { Router } from "express";
import { deleteUser, edit, login, profile, register } from "../controllers/authController";
import auth from "../middleware/auth";
import { getExerciseById, getExercises, RegisterExercise } from "../controllers/exerciseController";

export const routes = Router()

routes.get("/profile/:id", auth, profile)
routes.post("/register", register)
routes.post("/login", login)
routes.put("/edit/:id", auth, edit)
routes.delete("/delete/:id", auth, deleteUser)

// EXERCISE ROUTES

routes.post("/exercise", auth, RegisterExercise)
routes.get("/exercises", auth, getExercises)
routes.get("/exercise/:id", auth, getExerciseById)
