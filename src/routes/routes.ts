import { Router } from "express";
import { edit, login, register } from "../controllers/authController";
import auth from "../middleware/auth";

export const routes = Router()

routes.post("/register", register)
routes.post("/login", login)
routes.put("/edit/:id", auth, edit)
