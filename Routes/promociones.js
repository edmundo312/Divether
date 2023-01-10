import express from "express";
import {} from "dotenv/config";
import { view_promociones } from "../controllers/promociones_controller.js";
import { session_validation } from "../validations/session_validation.js";

const router_promociones = express.Router();

router_promociones.get("/", session_validation, view_promociones);

export default router_promociones;