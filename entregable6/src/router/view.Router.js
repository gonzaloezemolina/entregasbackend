import { Router } from "express";
import productManager from "../dao/mongo/modelsManagers/productosManager.js";
import cartManager from "../dao/mongo/modelsManagers/carritosManager.js";
const router = Router();
const productServices = new productManager();
const cartServices = new cartManager();

router.get("/", async (req, res) => {
    const renProducts = await productServices.getProducts();
    res.render("home", {renProducts})
})
  
  router.get("/cart", async (req, res) => {
    const cart = await cartServices.getCarts();
    const products = cart.products;
    res.render("cart", {
      products,
    });
  });

  router.get('/',async(req,res)=>{
    if(!req.session.user){
        return res.redirect('/login');
    }
    res.render('Profile',{user:req.session.user})
})

router.get('/register',async(req,res)=>{
    res.render('Register')
})

router.get('/login',async(req,res)=>{
    res.render('Login')
})
  


export default router