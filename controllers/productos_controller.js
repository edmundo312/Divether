import {} from "dotenv/config";
import { Productos } from "../models/productos.js"
export const view_productos = async (req,res,next) => {
    try {
        const { params } = req;
        const producto = await Productos.findAll({ where: {producto_status: "A"}})
        console.log(producto);
        const data ={
            base_url: process.env.BASE_URL,
            producto: producto
        }
        res.render("productos", data);
    } catch (error) {
        res.status(400).send(error);
        next();
    }
}

export const view_producto = async (req,res,next) => {
    try {
        const { params } = req;
        const productodddd = await Productos.findOne({where: {producto_id: params.producto_id}})
        const data ={
            base_url: process.env.BASE_URL,
            producto: productodddd
        }
        res.render("producto", data);
    } catch (error) {
        res.status(400).send(error);
        next();
    }
}