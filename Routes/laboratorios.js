import express from "express";
import {} from "dotenv/config";
import { view_laboratorios, prueba,laboratorio } from "../controllers/laboratorios_controller.js";
import { session_validation } from "../validations/session_validation.js";


const router_laboratorios = express.Router();

router_laboratorios.get("/", view_laboratorios);
router_laboratorios.get("/prueba", prueba);
router_laboratorios.get("/laboratorio/:laboratorio_id", laboratorio);

export default router_laboratorios;