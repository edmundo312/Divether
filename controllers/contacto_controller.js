import {} from "dotenv/config";
export const view_contacto = async (req,res,next) => {
    try {
        const { params } = req;
        const data ={
            base_url: process.env.BASE_URL
        }
        res.render("contacto", data);
    } catch (error) {
        res.status(400).send(error);
        next();
    }
}