import { User_group } from "../models/user_group.js";

export const nuevo_usuario = async (req,res,next) => {
    try {
        const user_group = await User_group.findAll({where:{user_group_status: "A"}});
        res.render("usuario/nuevo_usuario", {
            user_group: user_group,
            base_url: process.env.BASE_URL
        });
    } catch (error) {
        res.status(400).send(error);
        next();
    }
}