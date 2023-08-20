import express from "express";
import { __dirname } from "../utils.js";
import CartManager from "../managers/cartsManager.js";
const router = express.Router();
const carritoManager = new CartManager(__dirname + '/json/cart.json'); 


router.get("/carts", async (req,res) => {
    try{
        const cart = await carritoManager.getCarts();
        res.json({cart})
    } catch (error) {
        console.log("error", error);
        res.status(500).json({mesagge: "Carts no encontrados"})
    }
})

router.get("/carts/:cid", async (req,res) => {
    const cartId = parseInt(req.params.cid);
    try{
        const cart = await carritoManager.getCartbyId(cartId); 
    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({ message: 'Cart no encontrado por id' });
    }
    } catch (error) {
        console.log("Error", error);
    }
})


router.post("/carts/", async (req, res) => {
    const newcart = await carritoManager.addCart();
     res.json({ status: "success", newcart });
  });


  router.post("/carts/:cid/products/:pid", async (req, res) => {
    try {
      const cid = parseInt(req.params.cid);
      const pid = parseInt(req.params.pid);
  
      await carritoManager.addProductToCart(cid, pid);
      res.json({ status: "success", message: "Producto añadido." });
    } catch (error) {
      console.error("Error añadiendo:", error);
      res.status(500).json({ status: "error", message: "Fallo en añadir el producto" });
    }
  });


  router.delete("/carts/:cid/products/:pid", async (req, res) => {
    try {
      const cid = parseInt(req.params.cid);
      const pid = parseInt(req.params.pid);
  
      await carritoManager.removeProductFromCart(cid, pid);
      res.json({ status: "success", message: "Producto eliminado del carrito." });
    } catch (error) {
      console.error("Error", error);
      res.status(500).json({ status: "error", message: "Fallo en eliminar el producto." });
    }
  });

export default router