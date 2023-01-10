import express from "express";
import {} from "dotenv/config";
import { view_productos, view_producto } from "../controllers/productos_controller.js";
import { session_validation } from "../validations/session_validation.js";

const router_productos = express.Router();

router_productos.get("/", session_validation, view_productos);
router_productos.get("/producto/:producto_id", session_validation, view_producto);

export default router_productos;