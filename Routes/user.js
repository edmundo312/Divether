import express from "express";
import {} from "dotenv/config";

import { nuevo_usuario } from "../controllers/user_controller.js";
import { verify_token } from "./verifyToken.js";
import { session_validation } from "../validations/session_validation.js";

const router_user = express.Router();

router_user.get("/nuevo_usuario", nuevo_usuario);

export default router_user;