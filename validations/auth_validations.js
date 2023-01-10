import {check}  from "express-validator";

export const register_validation = [
    check("nombre", "El usuario es obligatorio").not().isEmpty(),
    check("password", "El password debe ser minimo de 6 caracteres").isLength({min:6}),
    check("email", "Agrega un Email valido").isEmail()
];

export const login_validation = [
    check("nombre", "El usuario es obligatorio").not().isEmpty(),
    check("password", "El password debe ser minimo de 6 caracteres").isLength({min:6})
]