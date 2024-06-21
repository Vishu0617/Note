import { Router } from "express";
import {
  login,
  logout,
  registration
} from "../controllers/auth.controller.js";
const AuthRoutes = Router();

AuthRoutes.post("/registration", registration);
AuthRoutes.post("/login", login);
AuthRoutes.post("/logout", logout);

export default AuthRoutes;
