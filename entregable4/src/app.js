import express from 'express';
import viewRouter from "./routes/view.Router.js";
import productsRouter from "./routes/products.Router.js"
import cartRouter from "./routes/carts.Router.js"
import { __dirname } from './utils.js';
import { Server } from 'socket.io';
import handlebars from "express-handlebars";
import ProductManager from './managers/productManager.js';

const app = express ();

const PORT = 8080
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"))


//Handlebars
app.engine("handlebars", handlebars.engine())
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
const pManagerSocket = new ProductManager(__dirname + "/json/products.json")
const socket = new Server(server)




socket.on("connection", async (socket) => {
    console.log("client connected, id: ", socket.id);
    const listadeproducts = await pManagerSocket.getProducts({});
    socket.emit("envioproducts", listadeproducts)
})

socket.emit("message", "Holaaaaaaaaaa")
