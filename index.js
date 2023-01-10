import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import {} from "dotenv/config";
import {all_laboratorios} from "./models/laboratorios.js";

// Importar Routers
import router_api_auth from "./Routes/auth.js";
import { session_validation } from "./validations/session_validation.js";
import router_nosotros  from "./Routes/nosotros.js";
import router_laboratorios from "./Routes/laboratorios.js";
import router_productos from "./Routes/productos.js";
import router_promociones from "./Routes/promociones.js";
import router_contacto from "./Routes/contacto.js";
import router_user from "./Routes/user.js";
import router_dashboard from "./Routes/dashboard.js";

//importar la conexión a la basede datos
import db from "./config/db.js";

// Se crea la app o servidor con express
const app = express();

//conetar base de datos
db.authenticate()
    .then(() => { console.log("Base de datos conectada") })
    .catch(error => { console.log(error); });

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('trust proxy', 1);
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(function(req, res, next) {
    res.locals.loged = req.session.loged;
    next();
});

// Archivos publicos
app.use(express.static("public"));

// motor de plantillas
app.set("view engine", "ejs");
app.set("views", "./views");

// Routes Middleware
const laboratorios = await all_laboratorios();
console.log(laboratorios);
app.get("/", session_validation, (req, res, next) => {
    res.render("index", { 
        base_url: process.env.BASE_URL, 
        laboratorios: laboratorios
         });
});

app.get("/login", (req, res, next) => {
    if (req.session.loged) {
        res.redirect("/");
    } else {
        res.render("login", { base_url: process.env.BASE_URL });
    }
});

//Rutas del API
app.use("/api/user", router_api_auth);

//Rutas de la aplicacion
app.use("/nosotros", router_nosotros);
app.use("/laboratorios", router_laboratorios);
app.use("/productos", router_productos);
app.use("/promociones", router_promociones);
app.use("/contacto", router_contacto);
app.use("/usuario", router_user);
app.use("/dashboard", router_dashboard);

//se indica el puerto
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor activo en el puerto ${port}`);
});