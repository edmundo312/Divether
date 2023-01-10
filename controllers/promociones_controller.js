import {} from "dotenv/config";
import { all_promociones } from "../models/promociones.js"
export const view_promociones = async (req,res,next) => {
    try {
        const { params } = req;
        const promociones = await all_promociones();
        const data ={
            base_url: process.env.BASE_URL,
            promociones: promociones
        }
        res.render("promociones", data);
    } catch (error) {
        res.status(400).send(error);
        next();
    }
}