import {} from "dotenv/config";
import {User, all_users} from '../models/user.js'
import { User_group } from "../models/user_group.js";
import { Laboratorios } from "../models/laboratorios.js";
import { Productos, all_productos } from "../models/productos.js"
import { Promociones, all_promociones } from "../models/promociones.js"

export const view_dashboard_principal = async (req,res,next) => {
    try {
        // const { session } = req;
        // const user = await User.findOne({ where: { user_id: session.user_id } });

        const data = {
            base_url: process.env.BASE_URL,
            // user: user
        }
        // console.log(data);
        res.render("dashboard/dashboard", data);
    } catch (error) {
        res.status(400).send(error);
        next();
    }
}

export const view_dashboard_principal_usuarios = async (req,res,next) => {
    try {
        const user = await all_users();
        // console.log(user_group);
        // console.log('user',user);
        const data = {
            base_url: process.env.BASE_URL,
            user: user
        }
        // console.log(data);
        res.render("dashboard/usuarios/usuarios", data);
    } catch (error) {
        res.status(400).send(error);
        next();
    }
}

export const eliminar_usuarios = async (req, res, next) => {
    try {
        const { body, params } = req;
        console.log('datos recibidos',body);
        // console.log('datos recibidos',params);
        //Crear nuevo grupo  
        const desactivar_promocion = await User.update({
            user_status: "I"
        }, {where: {user_id: body.usuario_id}});

        res.json({status: "Usuario eliminado con éxito!"});
    } catch (error) {
        //Enviar el error
        res.status(400).send(error);
        next();
    }
}

export const view_dashboard_nuevo_usuario = async (req,res,next) => {
    try {
        const user_group = await User_group.findAll({where:{user_group_status: "A"}});

        const data = {
            base_url: process.env.BASE_URL,
            user_group: user_group
        }

        res.render("dashboard/usuarios/nuevo_usuario", data);
    } catch (error) {
        consle.log(error);
        res.status(400).send(error);
        next();
    }
}

export const view_dashboard_principal_grupo_usuarios = async (req,res,next) => {
    try {
        const user_group = await User_group.findAll({ where: { user_group_status: "A" } });
        // console.log(user_group);
        const data = {
            base_url: process.env.BASE_URL,
            user_group: user_group
        }
        // console.log(data);
        res.render("dashboard/grupo_usuarios/grupo_usuarios", data);
    } catch (error) {
        res.status(400).send(error);
        next();
    }
}

export const view_dashboard_principal_nuevo_grupo_usuarios = async (req,res,next) => {
    try {
        const data = {
            base_url: process.env.BASE_URL,
        }
        // console.log(data);
        res.render("dashboard/grupo_usuarios/nuevo_grupo_usuarios", data);
    } catch (error) {
        res.status(400).send(error);
        next();
    }
}

export const register_group = async (req, res, next) => {
    try {
        const { body } = req;
        // console.log(body);
        const user_group_validation = await User_group.findOne({where: {user_group_name: body.nombre_grupo}});
        if(user_group_validation){
            res.status(400).send({error: "El grupo de usuarios ya esta en uso, intente con un nuevo grupo."});
            return;
        }
        //Crear nuevo grupo  
        const new_group = await User_group.create({
            user_group_name: body.nombre_grupo,
            user_group_status: "A"
        }); 
        res.json({
            user_group_id: new_group.user_group_id,
            mensaje: "Grupo registrado con éxito"
        });
    } catch (error) {
        //Enviar el error
        res.status(400).send(error);
        next();
    }
}

export const eliminar_grupo_usuarios = async (req, res, next) => {
    try {
        const { body, params } = req;
        console.log('datos recibidos',body);
        // console.log('datos recibidos',params);
        //Crear nuevo grupo  
        const desactivar_promocion = await User_group.update({
            user_group_status: "I"
        }, {where: {user_group_id: body.grupo_usuarios_id}});

        res.json({status: "Grupo de usuarios eliminado con éxito!"});
    } catch (error) {
        //Enviar el error
        res.status(400).send(error);
        next();
    }
}

export const view_dashboard_principal_laboratorios = async (req,res,next) => {
    try {
        const laboratorios = await Laboratorios.findAll({ where: { laboratorio_status: "A" } });
        // console.log(user_group);
        const data = {
            base_url: process.env.BASE_URL,
            laboratorios: laboratorios
        }
        // console.log(data);
        res.render("dashboard/laboratorios/laboratorios", data);
    } catch (error) {
        res.status(400).send(error);
        next();
    }
}

export const view_dashboard_principal_nuevo_laboratorio = async (req,res,next) => {
    try {
        const data = {
            base_url: process.env.BASE_URL,
        }
        // console.log(data);
        res.render("dashboard/laboratorios/nuevo_laboratorio", data);
    } catch (error) {
        res.status(400).send(error);
        next();
    }
}

export const register_laboratorio = async (req, res, next) => {
    try {
        const { body, params } = req;
        console.log('datos recibidos',body);
        // console.log('datos recibidos',params);
        const laboratorio_validation = await Laboratorios.findOne({where: {laboratorio_nombre: body.laboratorio_nombre[0]}});
        if(laboratorio_validation){
            res.status(400).send({error: "El nombre del laboratorio ya esta en uso, intente con uno nuevo."});
            return;
        }
        //Crear nuevo grupo  
        const new_laboratorio = await Laboratorios.create({
            laboratorio_nombre: body.laboratorio_nombre[0],
            laboratorio_imagen: body.imagen_nombre,
            laboratorio_status: "A"
        }); 
        res.json({
            laboratorio_id: new_laboratorio.laboratorio_id,
            mensaje: "Laboratorio registrado con éxito"
        });
    } catch (error) {
        //Enviar el error
        res.status(400).send(error);
        next();
    }
}

export const eliminar_laboratorio = async (req, res, next) => {
    try {
        const { body, params } = req;
        console.log('datos recibidos',body);
        // console.log('datos recibidos',params);
        //Crear nuevo grupo  
        const desactivar_promocion = await Laboratorios.update({
            laboratorio_status: "I"
        }, {where: {laboratorio_id: body.laboratorio_id}});

        res.json({status: "Laboratorio eliminado con éxito!"});
    } catch (error) {
        //Enviar el error
        res.status(400).send(error);
        next();
    }
}

export const view_dashboard_principal_nuevo_productos = async (req,res,next) => {
    try {
        const productos = await Productos.findAll({ where: {producto_status: "A"}})
        const laboratorios = await Laboratorios.findAll({ where: { laboratorio_status: "A" } });
        const data = {
            base_url: process.env.BASE_URL,
            productos: productos,
            laboratorios: laboratorios
        }
        // console.log(data);
        res.render("dashboard/productos/nuevo_producto", data);
    } catch (error) {
        res.status(400).send(error);
        next();
    }
}

export const view_dashboard_principal_productos = async (req,res,next) => {
    try {
        const productos = await all_productos()
        const data = {
            base_url: process.env.BASE_URL,
            productos: productos
        }
        // console.log(data);
        res.render("dashboard/productos/productos", data);
    } catch (error) {
        res.status(400).send(error);
        next();
    }
}

export const register_producto = async (req, res, next) => {
    try {
        const { body, params } = req;
        console.log('datos recibidos',body);
        // console.log('datos recibidos',params);
        const productos_validation = await Productos.findOne({ where: {producto_nombre: body.producto_nombre[0]}})
        if(productos_validation){
            res.status(400).send({error: "El nombre del producto ya esta en uso, intente con uno nuevo."});
            return;
        }
        //Crear nuevo grupo  
        const new_producto = await Productos.create({
            producto_nombre: body.producto_nombre[0],
            producto_imagen: body.producto_imagen,
            producto_uso: body.producto_uso[0],
            producto_descripcion: body.producto_descripcion[0],
            producto_precio: body.producto_precio[0],
            producto_laboratorio_id: body.producto_laboratorio_id[0],
            producto_status: "A"
        }); 
        res.json({
            producto_id: new_producto.producto_id,
            mensaje: "Producto registrado con éxito"
        });
    } catch (error) {
        //Enviar el error
        res.status(400).send(error);
        next();
    }
}

export const eliminar_producto = async (req, res, next) => {
    try {
        const { body, params } = req;
        console.log('datos recibidos',body);
        // console.log('datos recibidos',params);
        //Crear nuevo grupo  
        const desactivar_promocion = await Productos.update({
            producto_status: "I"
        }, {where: {producto_id: body.producto_id}});

        res.json({status: "Producto eliminado con éxito!"});
    } catch (error) {
        //Enviar el error
        res.status(400).send(error);
        next();
    }
}

export const view_dashboard_promociones = async (req,res,next) => {
    try {
        // const { session } = req;
        const promociones = await all_promociones();

        const data = {
            base_url: process.env.BASE_URL,
            promociones: promociones
            // user: user
        }
        // console.log(data);
        res.render("dashboard/promociones/promociones", data);
    } catch (error) {
        res.status(400).send(error);
        next();
    }
}

export const view_dashboard_nuevas_promociones = async (req,res,next) => {
    try {
        // const { session } = req;
        const laboratorios = await Laboratorios.findAll({ where: { laboratorio_status: "A" } });

        const data = {
            base_url: process.env.BASE_URL,
            laboratorios: laboratorios
            // user: user
        }
        // console.log(data);
        res.render("dashboard/promociones/nueva_promocion", data);
    } catch (error) {
        res.status(400).send(error);
        next();
    }
}

export const register_promocion = async (req, res, next) => {
    try {
        const { body, params } = req;
        console.log('datos recibidos',body);
        // console.log('datos recibidos',params);
        const promocion_validation = await Promociones.findOne({ where: {promocion_nombre: body.promocion_nombre[0]}})
        if(promocion_validation){
            res.status(400).send({error: "El nombre de la promocion ya esta en uso, intente con uno nuevo."});
            return;
        }
        //Crear nuevo grupo  
        const new_promocion = await Promociones.create({
            promocion_nombre: body.promocion_nombre[0],
            promocion_imagen: body.promocion_imagen,
            promocion_pdf: body.promocion_pdf,
            promocion_laboratorio_id: body.promocion_laboratorio_id[0],
            promocion_status: "A"
        }); 
        res.json({
            promocion_id: new_promocion.promocion_id,
            mensaje: "Promocion registrado con éxito"
        });
    } catch (error) {
        //Enviar el error
        res.status(400).send(error);
        next();
    }
}

export const eliminar_promocion = async (req, res, next) => {
    try {
        const { body, params } = req;
        console.log('datos recibidos',body);
        // console.log('datos recibidos',params);
        //Crear nuevo grupo  
        const desactivar_promocion = await Promociones.update({
            promocion_status: "I"
        }, {where: {promocion_id: body.promocion_id}});

        res.json({status: "Promocion eliminado con éxito!"});
    } catch (error) {
        //Enviar el error
        res.status(400).send(error);
        next();
    }
}