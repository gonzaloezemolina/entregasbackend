# Crear un servidor y configurar rutas utilizando Postman
# Antes de empezar, instalar Node JS y Postman

- Node.js: [Descargar y instalar Node.js](https://nodejs.org/)
- Postman: [Descargar y instalar Postman](https://www.postman.com/)

# PASOS
1. Crear una nueva carpeta para el proyecto y iniciar una terminal.
2. Utilizar el comando: npm init -y (Nos brindara un archivo json)
3. Instalar las dependencias requeridas (express) usando el comando: npm i express
4. Crear un archivo app.js y hacer un servidor express. Por ejemplo el siguiente:

const express = require('express')
const app = express ();
const PORT = 8080

app.listen(PORT,() => {
    console.log(`server is listening on port {PORT}`);
});

5. Correr el servidor con node app.js

# Rutas con POSTMAN

6. Abrir postman y crear una nueva collecion.
7. Escoger el metodo HTTP (GET,POST,DELETE,PUT)
8. Escribir la URL del servidor http://localhost8080
9. Enviar el request y observar la respuesta.

# Rutas en el servidor

10. Añadir rutas al servidor en nuestro archivo app.js. Por ejemplo el siguiente:

app.get('/saludo, (req, res) => {
    res.send("Hola mundo");
});

11. Reiniciar el servidor con node app.js
12. En POSTMAN enviar una GET request al http://localhost8080/saludo y observar la respuesta.





