import express from 'express';
import productsRouter from "../src/routes/products.Router.js"
import cartRouter from "../src/routes/carts.Router.js"
const app = express ();

const PORT = 8080
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Rutas
app.use("/api",productsRouter); 
app.use("/api",cartRouter)

const server = app.listen(PORT, () =>{
    console.log(`Server HTTP is listening on PORT ${server.address().port}`);
})

server.on("error", error => console.log(`Error en el servidor ${error}`))