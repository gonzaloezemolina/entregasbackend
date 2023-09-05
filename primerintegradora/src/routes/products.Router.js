import express from "express";
import { __dirname } from "../utils.js";
import ProductManager from "../dao/fileSystem/managers/productManager.js";

const router = express.Router();

const productManager = new ProductManager(__dirname + "/json/products.json");

router.get("/products", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    console.log("Products:", products);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error: No se encontraron los productos" });
  }
});

router.get("/products/:pid", async (req, res) => {
  const productId = parseInt(req.params.pid);
  try {
    const product = await productManager.getProductById(productId);
    console.log("Product:", product);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error producto por id no encontrado" });
  }
});

router.post("/products", async (req, res) => {
  try {
    const { title, description, price, thumbnail, code, stock } = req.body;
    await productManager.addProduct(
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    );
    res.status(true).json({ message: "Producto nuevo creado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creando el producto" });
  }
});

router.put("/products/:pid", async (req, res) => {
  const productId = parseInt(req.params.pid);
  const { title, description, price, thumbnail, code, stock } = req.body;

  try {
    await productManager.updateProduct(
      7,
      "Auriculares Gamer Sony",
      "Auriculares Gamer Sony Grey",
      15000,
      "/public/img/auricularessony.png",
      "abc122",
      13,
    );
    res.json({ message: "Producto modificado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error modificando el producto" });
  }
});

router.delete('/products/:pid', async (req, res) => {
  const productId = parseInt(req.params.pid);

  try {
    await productManager.deleteProduct(productId);
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error eliminando el producto' });
  }
});

export default router;
