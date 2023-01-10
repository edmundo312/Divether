import {} from "dotenv/config";
import { Laboratorios, all_laboratorios } from "../models/laboratorios.js"
import {obtener_productos_by_laboratorio} from "../models/productos.js"
export const view_laboratorios = async (req,res,next) => {
    try {
        const { params } = req;
        console.log(params);
        const laboratorios = await all_laboratorios();
        const data ={
            base_url: process.env.BASE_URL,
            laboratorios: laboratorios
        }
         console.log(data);
        res.render("laboratorios", data);
    } catch (error) {
        res.status(400).send(error);
        next();
    }
}

export const prueba = async (req,res,next) => {
    try {
        const { params } = req;
        // console.log(params);
        const laboratorios = await all_laboratorios();
        const data ={
            base_url: process.env.BASE_URL,
            laboratorios: laboratorios
        }
        // console.log(data);
        res.render("prueba", data);
    } catch (error) {
        res.status(400).send(error);
        next();
    }
}

export const laboratorio = async (req,res,next) => {
    try {
        const { params } = req;
        const laboratorios = await obtener_productos_by_laboratorio(params.laboratorio_id);
        const data = {
            base_url: process.env.BASE_URL,
            laboratorios: laboratorios
        }
        res.render("laboratorio", data);
    } catch (error) {
        res.status(400).send(error);
        next();
    }
}