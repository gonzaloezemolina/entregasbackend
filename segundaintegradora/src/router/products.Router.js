import baseRouter from "./base.Router.js";
import productManager from "../dao/mongo/modelsManagers/productosManager.js"
import uploader from "../services/uploadService.js";

const productService = new productManager();

class productsManager extends baseRouter{
  init(){
    this.get("/",["PUBLIC"],async(req,res)=>{
      const productos = await productService.getProducts();
      res.send({status:"success",payload:"products"})
    })

    this.post("/",["ADMIN"],uploader.array('images'),async(req,res)=>{
      const {
        title,description,price,thumbnail,code,stock
      } = req.body

      if (!title||!description||!price||!thumbnail||!code||!stock) return res.status(400).send({status:"error", error:"Incomplete values"}) 
        
      const newProd = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock
      }

      const images = req.files.map(file=>`${req.protocol}://${req.hostname}:${process.env.PORT||8080}/img/${file.filename}`);
      newProd.thumbnail = images
      const result = await productService.createProduct(newProd);
      res.send({status:"success",payload:result._id});
    })

    this.put('/:pid',['ADMIN'],async (req,res)=>{
      const {pid} = req.params;
      const {
          title,
          description,
          price,
          thumbnail,
          code,
          stock
      } = req.body;

      const actualizarProducto = {
          title,
          description,
          price,
          thumbnail,
          code,
          stock
      }

      const productoporid = await productService.getProductById({_id:pid});
      if(!productoporid) return res.status(400).send({status:"error",error:"Producto no existe"});
      await productService.updateProduct(pid,actualizarProducto);
      res.send({status:"success",message:"Product updated"});
  
  })
  this.delete('/:pid',['ADMIN'],async (req,res)=>{
      const {pid} = req.params;
      const result = await productService.deleteProduct(pid);
      res.send({status:"success",message:"Product Deleted"})
  })

  }
}

const prodManager = new productsManager();
export default prodManager.getRouter();










// import express from "express";
// import productManager from "../dao/mongo/modelsManagers/productosManager.js";
// const router = express.Router();
// const productServices = new productManager();

// //Obtener productos
// router.get("/products", async (req, res) => {
//   try {
//     const products = await productServices.getProducts();
//     console.log("Products:", products);
//     res.send({status:"success",payload:products})
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error: No se encontraron los productos" });
//   }
// });

// //Obtener producto por id
// router.get("/products/:pid", async (req, res) => {
//   const productId = parseInt(req.params.pid);
//   try {
//     const product = await productServices.getProductById(productId);
//     console.log("Product:", product);
//     if (product) {
//       res.json(product);
//     } else {
//       res.status(404).json({ message: "Producto no encontrado" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error producto por id no encontrado" });
//   }
// });

// //Crear producto
// router.post("/products", async (req, res) => {
//   try {
//     const { title, description, price, thumbnail, code, stock } = req.body;
//     await productServices.createProduct(
//       title,
//       description,
//       price,
//       thumbnail,
//       code,
//       stock
//     );
//     res.status(true).json({ message: "Producto nuevo creado" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error creando el producto" });
//   }
// });

// //Modificar producto
// router.put("/products/:pid", async (req, res) => {
//   const productId = parseInt(req.params.pid);
//   const { title, description, price, thumbnail, code, stock } = req.body;

//   try {
//     await productServices.updateProduct(
//       7,
//       "Auriculares Gamer Sony",
//       "Auriculares Gamer Sony Grey",
//       15000,
//       "/public/img/auricularessony.png",
//       "abc122",
//       13,
//     );
//     res.json({ message: "Producto modificado exitosamente" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error modificando el producto" });
//   }
// });

// //Eliminar producto
// router.delete('/products/:pid', async (req, res) => {
//   const productId = parseInt(req.params.pid);

//   try {
//     await productServices.deleteProduct(productId);
//     res.json({ message: 'Producto eliminado' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error eliminando el producto' });
//   }
// });

// export default router;
