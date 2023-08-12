import express from "express";
const app = express ();

const PORT = 8080
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes

const server = app.listen(PORT, () =>{
    console.log(`Server HTTP is running on PORT ${server.address().port}`);
})

server.on("error", error => console.log(`Error en el servidor ${error}`))