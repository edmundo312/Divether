import {} from "dotenv/config";
import {User} from '../models/user.js'
export const view_nosotros = async (req,res,next) => {
    try {
        const { session } = req;
        const user = await User.findOne({ where: { user_id: session.user_id } });

        const data = {
            base_url: process.env.BASE_URL,
            user: user
        }
        // console.log(data);
        res.render("nosotros", data);
    } catch (error) {
        res.status(400).send(error);
        next();
    }
}