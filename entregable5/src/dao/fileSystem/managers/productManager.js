import fs from "fs"

export default class ProductManager{
    constructor(path){
        this.path=path,
     this.products=[]
    }
    
    getProducts=async()=>{
    const productlist= await fs.promises.readFile(this.path,"utf-8")
    const productlistparse=JSON.parse(productlist)
    return productlistparse
    }
    
    generateId=async()=>{
        const counter=this.products.length
        if(counter==0){
            return 1
        }
        else{
            return (this.products[counter-1].id)+1
        }
    }

    addProduct=async(title,description,price,thumbnail,code,stock)=>{
      if(!title || !description || !price || !thumbnail|| !code||!stock){
        console.error("Ingrese todos los datos del producto")
        return 
      }
      else{
        const codigorepetido=this.products.find(elemento=>elemento.code===code)
        if(codigorepetido){
             console.error("El codigo del producto que desea añadir esta repetido")
             return
        }
        else{
            const id=await this.generateId()
            const productnew={
                id,title,description,price,thumbnail,code,stock
            }
            this.products.push(productnew)
            await fs.promises.writeFile(this.path,JSON.stringify(this.products,null,2))
        }
      }
    }


     updateProduct=async(id,title,description,price,thumbnail,code,stock)=>{
        if(!id|| !title || !description || !price || !thumbnail|| !code||!stock){
          console.error("Ingrese todos los datos para actualizar el producto")
          return 
        }
        else{
            const allproducts=await this.getProducts()
            const codigorepetido=allproducts.find(elemento=>elemento.code===code)
            if(codigorepetido){
                 console.error("El codigo del producto a actualizar esta repetido")
                 return
            }
            else{
                const currentProductsList=await this.getProducts()
                const newProductsList=currentProductsList.map(elemento=>{
                    if(elemento.id===id){
                      const updatedProduct={
                        ...elemento,
                        title,description,price,thumbnail,code,stock
                      }
                      return updatedProduct
                    }
                    else{
                        return elemento
                    }
                })
                await fs.promises.writeFile(this.path,JSON.stringify(newProductsList,null,2))
            }
            
        }
      }

      deleteProduct=async(id)=>{
        const allproducts=await this.getProducts()
        const productswithoutfound=allproducts.filter(elemento=>elemento.id!==id)
       await fs.promises.writeFile(this.path,JSON.stringify(productswithoutfound,null,2))
      }
    getProductById=async(id)=>{
        const allproducts=await this.getProducts()
       const found=allproducts.find(element=>element.id===id)
       return found
    }


}
