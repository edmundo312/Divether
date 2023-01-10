import express from "express";
import {} from "dotenv/config";
import { view_nosotros } from "../controllers/nosotros_controller.js";
import { session_validation } from "../validations/session_validation.js";

const router_nosotros = express.Router();

router_nosotros.get("/", session_validation, view_nosotros);

export default router_nosotros;