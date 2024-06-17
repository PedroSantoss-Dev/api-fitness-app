import { Router } from "express";
import { register } from "../controllers/authController";

export const routes = Router()

routes.post("/register", register)
