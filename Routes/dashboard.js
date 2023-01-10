// view_dashboard_principal
import express from "express";
import {} from "dotenv/config";
import { view_dashboard_principal,
    view_dashboard_principal_usuarios,
    view_dashboard_nuevo_usuario,
    view_dashboard_principal_grupo_usuarios,
    eliminar_usuarios,
    view_dashboard_principal_nuevo_grupo_usuarios,
    register_group,
    eliminar_grupo_usuarios,
    view_dashboard_principal_laboratorios,
    view_dashboard_principal_nuevo_laboratorio,
    register_laboratorio,
    eliminar_laboratorio,
    view_dashboard_principal_productos,
    view_dashboard_principal_nuevo_productos,
    register_producto,
    eliminar_producto,
    view_dashboard_promociones,
    view_dashboard_nuevas_promociones,
    register_promocion,
    eliminar_promocion
} from "../controllers/dashboard_controller.js";
import { upload } from "../controllers/upload_controller.js";
import { upload_pdf } from "../controllers/upload_pdf_controller.js";
import { session_validation } from "../validations/session_validation.js";

const router_dashboard = express.Router();

router_dashboard.get("/", view_dashboard_principal);
router_dashboard.get("/usuarios", view_dashboard_principal_usuarios);
router_dashboard.get("/nuevo_usuarios", view_dashboard_nuevo_usuario);
router_dashboard.post("/eliminar_usuario", eliminar_usuarios);
router_dashboard.get("/grupo_usuarios", view_dashboard_principal_grupo_usuarios);
router_dashboard.get("/nuevo_grupo_usuarios", view_dashboard_principal_nuevo_grupo_usuarios);
router_dashboard.post("/register/nuevo_grupo_usuarios", register_group);
router_dashboard.post("/eliminar_grupo_usuarios", eliminar_grupo_usuarios);
router_dashboard.get("/laboratorios", view_dashboard_principal_laboratorios);
router_dashboard.get("/nuevo_laboratorio", view_dashboard_principal_nuevo_laboratorio);
router_dashboard.post("/register/nuevo_laboratorio", upload, register_laboratorio);
router_dashboard.post("/eliminar_laboratorio", eliminar_laboratorio);
router_dashboard.get("/productos", view_dashboard_principal_productos);
router_dashboard.get("/nuevo_producto", view_dashboard_principal_nuevo_productos);
router_dashboard.post("/register/nuevo_producto", upload, register_producto);
router_dashboard.post("/eliminar_producto", eliminar_producto);
router_dashboard.get("/promociones", view_dashboard_promociones);
router_dashboard.get("/nueva_promocion", view_dashboard_nuevas_promociones);
router_dashboard.post("/register/nueva_promocion", upload_pdf, register_promocion);
router_dashboard.post("/eliminar_promocion", eliminar_promocion);

export default router_dashboard;