import {User} from "../models/user.js";
import moment from "moment";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import {} from "dotenv/config";

export const register = async (req, res, next) => {
    try {
        // validar datos
        // const errores = validationResult(req);
        // if(!errores.isEmpty()){
        //     res.status(400).json({errores:errores.array()});
        //     return;
        // }
        const {body} = req;
        const user_validation = await User.findOne({where: {user_nombre: body.nombre}});
        if(user_validation){
            res.status(400).send({error: "El usuario ya esta en uso, intente con un nuevo usuario."});
            return;
        }
        // password hashing 
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash_password = await bcrypt.hash(body.password, salt);
        //Crear nuevo usuario  
        const new_user = await User.create({
            user_nombre: body.nombre,
            user_password: hash_password,
            user_group_id: body.user_group_id,
            user_correo: body.email,
            user_telefono: body.telefono,
            user_ubicacion: body.ubicacion,
            user_status: 'A'
        }); 
        res.json({
            user_id:new_user.user_id,
            mensaje: "Usuario registrado con éxito"
        });
    } catch (error) {
        //Enviar el error
        res.status(400).send(error);
        next();
    }
}

export const login = async (req, res, next) => {
    try {
        // Validación
        const errores = validationResult(req);
        if(!errores.isEmpty()){
            res.status(400).json({errores:errores.array()});
        }
        const {body} = req;
        //validar si el usuario existe  
        const user = await User.findOne({where: {user_nombre: body.nombre}});
        if(user.user_status !== 'A') return res.status(400).send("El usuario o la contraseña son incorrectos");
        if(!user) return res.status(400).send("El usuario o la contraseña son incorrectos");
        //Validar si la contraseña es correcta
        //comparar los paswords hasheados
        const match = await bcrypt.compare(body.password, user.user_password);
        if(!match)return res.status(400).send("El usuario o la contraseña son incorrectos");
        //crear un payload
        const payload = {id:user.user_id}; 
        //Firmar el token      
        const { sign, verify } = jwt;
        const token = sign(payload, process.env.TOKEN_SECRET, {expiresIn: 300000})
        req.session.loged = true;
        req.session.user_id = user.user_id;
        // req.session.user_nombre = user.user_nombre;
        
        res.header("auth-token", token).json({
            token:token,
            user:{
                user_id:user.user_id,
                user_nombre:user.user_nombre,
                user_email:user.user_correo,
                user_group_id: user.user_group_id
            }
        });
    } catch (error) {
        res.status(400).send(error);
        next();
    }
}

export const logout = (req, res, next) => {
    req.session.destroy();
    res.json({state: "Sesion finalizada"});
}

export const user_by_id = (req, res, next) => {
    res.json({aqui: "aqui"});
}