import baseRouter from "./base.Router.js";
import productManager from "../dao/mongo/modelsManagers/productosManager.js";;
const productServices = new productManager();

class ViewRouter extends baseRouter{
  init(){
    this.get('/register',['NO_AUTH'],async (req,res)=>{
      res.render('Register')
    })

    this.get('/login',['NO_AUTH'],async(req,res)=>{
      res.render('Login')
    })

    this.get('/profile',['AUTH'],async(req,res)=>{
      res.render('profile')
    })

    this.get('/',['PUBLIC'],async(req,res)=>{
      const renProducts = await productServices.getProducts();
      res.render("home", {renProducts})
    })
  }
}

const viewsRouter = new ViewRouter();
export default viewsRouter.getRouter();