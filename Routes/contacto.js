import express from "express";
import {} from "dotenv/config";
import { view_contacto } from "../controllers/contacto_controller.js";
import { session_validation } from "../validations/session_validation.js";

const router_contacto = express.Router();

router_contacto.get("/", session_validation, view_contacto);

export default router_contacto;