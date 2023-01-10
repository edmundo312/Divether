import jwt from "jsonwebtoken";
import {} from "dotenv/config";

export const verify_token = (req, res, next) => {
    const { sign, verify } = jwt;
    const token = req.header("auth-token");
    if(!token) return res.status(401).send("Acceso denegado");
    try {
        const verified = verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send("Token Invalido");
        next();
    }
}