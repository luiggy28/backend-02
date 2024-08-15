import express from "express";
import routes from "./routes/index.js";
import __dirname from "./dirname.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import viewsRoutes from "./routes/views.routes.js";
import studentRoutes from "./routes/students.routes.js";
import usersRoutes from "./routes/users.routes.js";
import { connectMongoDB } from "./config/mongoDB.config.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import envs from "./config/envs.config.js";

const app = express();


connectMongoDB()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("handlebars", handlebars.engine()); // Inicia el motor del la plantilla
app.set("views", __dirname + "/views"); // Indicamos que ruta se encuentras las vistas
app.set("view engine", "handlebars"); // Indicamos con que motor vamos a utilizar las vistas
/* app.use(express.static("public")); */

app.use(cookieParser('mySecretKey')); // Inicializamos el middleware de cookie-parser
app.use(session({
    secret: envs.SECRET_CODE,
    resave: true,
    saveUninitialized: true,
})); // Inicializamos el middleware de session

// Rutas de la api
app.use("/api", routes);


// Ruta de las vistas
app.use("/", viewsRoutes)
app.use("/student", studentRoutes)
app.use("/user", usersRoutes)


const httpServer = app.listen(envs.PORT, () => {
    console.log(`Server on port ${envs.PORT}`); // Iniciamos el servidor en el puerto 8080
});

// Configuramos socket
export const io = new Server(httpServer); // Inicializamos el servidor de socket


io.on("connection", (socket) => {
    console.log("Nuevo usuario Conectado"); // Cuando un usuario se conecta, mostramos un mensaje en consola
});