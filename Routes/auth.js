import express from "express";
import { 
    register, 
    login,
    user_by_id,
    logout 
} from "../controllers/auth_controller.js";
import { register_validation, login_validation } from "../validations/auth_validations.js";
import {verify_token} from "./verifyToken.js";

const router_api_auth = express.Router();


router_api_auth.post("/register",register_validation, register);
router_api_auth.post("/login", login_validation, login);  
router_api_auth.get("/user", verify_token, user_by_id);
router_api_auth.post("/logout", logout);

export default router_api_auth;