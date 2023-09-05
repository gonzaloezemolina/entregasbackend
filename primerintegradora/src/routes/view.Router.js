import { Router } from "express";
import ProductManager from "../dao/fileSystem/managers/productManager.js";
import { __dirname } from "../utils.js";
const router = Router();


const pManager = new ProductManager (__dirname+ "/json/products.json");

router.get("/", async (req, res) => {
    try {
        const listProducts = await pManager.getProducts();
        res.render("home", {listProducts});
    } catch (error) {
        console.error("Error renderizando:", error);
        res.status(500).send("Server Error");
    }
});


router.get("/realtimeproducts", (req, res) => {
    try {
        res.render("realtimeproducts");
    } catch (error) {
        console.error("Error renderizando:", error);
        res.status(500).send("Server Error");
    }
});


export default router