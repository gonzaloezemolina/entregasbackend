import express from "express";
import productManager from "../dao/mongo/modelsManagers/productosManager.js";
const router = express.Router();
const productServices = new productManager();

//Obtener productos
router.get("/products", async (req, res) => {
  try {
    const products = await productServices.getProducts();
    console.log("Products:", products);
    res.send({status:"success",payload:products})
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error: No se encontraron los productos" });
  }
});

//Obtener producto por id
router.get("/products/:pid", async (req, res) => {
  const productId = parseInt(req.params.pid);
  try {
    const product = await productServices.getProductById(productId);
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

//Crear producto
router.post("/products", async (req, res) => {
  try {
    const { title, description, price, thumbnail, code, stock } = req.body;
    await productServices.createProduct(
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

//Modificar producto
router.put("/products/:pid", async (req, res) => {
  const productId = parseInt(req.params.pid);
  const { title, description, price, thumbnail, code, stock } = req.body;

  try {
    await productServices.updateProduct(
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

//Eliminar producto
router.delete('/products/:pid', async (req, res) => {
  const productId = parseInt(req.params.pid);

  try {
    await productServices.deleteProduct(productId);
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error eliminando el producto' });
  }
});

export default router;
