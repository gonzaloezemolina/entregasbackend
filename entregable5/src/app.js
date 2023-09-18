//Imports
import express from 'express';
import Handlebars from 'Handlebars';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import viewRouter from "./router/view.Router.js"
import productsRouter from "./router/products.Router.js"
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';
import cartRouter from "./router/carts.Router.js"
import {__dirname} from "./utils.js"
import { Server } from 'socket.io';
import handlebars from "express-handlebars";
import ExpressHandlebars from 'express-handlebars';
import productManager from './dao/mongo/modelsManagers/productosManager.js';
import mongoose from 'mongoose';


const app = express ();

const PORT = process.env.PORT||8080
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"))


//Handlebars
app.engine(
    'handlebars',
    ExpressHandlebars.engine({
      handlebars: allowInsecurePrototypeAccess(Handlebars),
    })
  );
app.set("views", __dirname+ "/views")
app.set("view engine", "handlebars" )


//Rutas
app.use("/api",productsRouter);
app.use("/api",cartRouter)
app.use("/",viewRouter)


//Http
const server = app.listen(PORT, () =>{
    console.log(`Server HTTP is listening on PORT ${server.address().port}`);
})
server.on("error", error => console.log(`Error en el servidor ${error}`))

//Socket
const pManagerSocket = new productManager(__dirname + "/json/products.json")
const socket = new Server(server)
socket.on("connection", async (socket) => {
    console.log("client connected, id: ", socket.id);
    const listadeproducts = await pManagerSocket.getProducts({});
    socket.emit("envioproducts", listadeproducts)
})

//Mongo
const conexion = mongoose.connect("mongodb+srv://gonzaloezemolina:gonzalo2013@cluster0.n8ds0sl.mongodb.net/ecommerce?retryWrites=true&w=majority")