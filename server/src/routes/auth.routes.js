import { Router } from "express";
import { protect, restrictTo } from "../middleware/auth.js";
import {
  adminLogin,
  customerLogin,
  register,
  logout,
  me,
} from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", customerLogin);
authRouter.post("/admin/login", adminLogin);
authRouter.post("/logout", logout);
authRouter.get("/me", protect, me);

export default authRouter;
