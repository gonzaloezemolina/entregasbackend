import express from "express";
import ProductManager from "./managers/productManager.js";


const app = express()
const PORT = 8080;


const productManager = new ProductManager("./src/files/products.json")

app.get('/products', async (req, res) => {
    try {
      const products = await productManager.getProducts();
      res.json(products);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  app.get('/products/:id', async (req, res) => {
    try {
      const productId = parseInt(req.params.id);
      const product = await productManager.getProductById(productId);
  
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });



const server = app.listen(PORT, () =>{
    console.log(`Server HTTP is running on PORT ${server.address().port}`);
})

server.on("error", error => console.log(`Error en el servidor ${error}`))