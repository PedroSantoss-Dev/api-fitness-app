import { Router } from "express";
import { login, register } from "../controllers/authController";

export const routes = Router()

routes.post("/register", register)
routes.post("/login", login)
