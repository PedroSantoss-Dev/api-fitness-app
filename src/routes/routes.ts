import { Router } from "express";
import { edit, login, register } from "../controllers/authController";

export const routes = Router()

routes.post("/register", register)
routes.post("/login", login)
routes.put("/edit/:id", edit)
