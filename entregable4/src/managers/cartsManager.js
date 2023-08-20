import fs from "fs"

  export default class CartManager{
      constructor(path){
          this.path=path
      }

    getCarts=async()=>{
      try{
        if(fs.existsSync(this.path)){
          const cartlist= await fs.promises.readFile(this.path,"utf-8")
          const cartlistparse=JSON.parse(cartlist)
          return cartlistparse
        }
        else{
          return  []
          
        }
      }
      catch(error)
      {
        throw new Error(error)
      }
    }

  getCartbyId = async (id) => {
    const allcarts = await this.getCarts();
    const found = allcarts.find(element => element.id === id); 
    if (found) {
      return found;
    } else {
      console.error("Carrito por ID no encontrado");
    }
  }

    generateCartId=async()=>{
       if(fs.existsSync(this.path)){
        const listadecarts=await this.getCarts()
        const counter=listadecarts.length
        if(counter==0){
            return 1
        }
        else{
            return (listadecarts[counter-1].id)+1
        }
       }
    }

    addCart=async()=>{
      try{
      const listadecarts = await this.getCarts()
            const id = await this.generateCartId()
            const cartnew = {
                id,
                products:[]
            }
            listadecarts.push(cartnew)
            await fs.promises.writeFile(this.path,JSON.stringify(listadecarts,null,2))
            return cartnew
          } catch (error) {
            console.log("Error añadiendo el producto al carrito", error);
          }
          }
      
    
          addProductToCart = async (cid, pid) => {
            try {
              console.log("Adding product to cart:", cid, pid);
              
              const carts = await this.getCarts();
              console.log("Current carts:", carts);
              
              const cart = carts.find((cart) => cart.id === cid);
          
              if (cart) {
                const productExists = cart.products.some(
                  (product) => product.pid === pid
                );
          
                if (productExists) {
                  console.log("Product exists in cart, incrementing quantity");
                  cart.products.find((product) => product.pid === pid).quantity++;
                } else {
                  console.log("Product does not exist in cart, adding");
                  cart.products.push({
                    pid: pid,
                    quantity: 1,
                  });
                }
          
                await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
              }
            } catch (error) {
              console.log("Error:", error);
            }
          };

          removeProductFromCart = async (cid, pid) => {
            try {
              console.log("Removing product from cart:", cid, pid);
              
              const carts = await this.getCarts();
              console.log("Current carts:", carts);
              
              const cart = carts.find((cart) => cart.id === cid);
          
              if (cart) {
                const productIndex = cart.products.findIndex((product) => product.pid === pid);
          
                if (productIndex !== -1) {
                  console.log("Producto en carrito encontrado. Eliminando ");
                  cart.products.splice(productIndex, 1);
                  await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
                  console.log("Carrito actualizado");
                } else {
                  console.log("Producto no encontrado en el carrito");
                }
              }
            } catch (error) {
              console.log("Error:", error);
            }
          };
}