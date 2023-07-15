class ProductManager{
    constructor(){
        this.products = []
    }

    static id = 0
    

    addProduct(title,description,price,thumbnail,code,stock){
        ProductManager.id++
        this.products.push({title,description,price,thumbnail,code,stock, id:ProductManager.id})
    }

    getProduct(){
        return this.products
    }

    getProductById(id){
        if (!this.products.find((producto) => producto.id === id)) {
            console.log("No encontrado");
        } else {
            console.log("Existe");
        }
    }
}
//Test
const productos = new ProductManager
productos.addProduct("producto1","description1",1000,"imagen1","abc123",11)
productos.addProduct("producto2","description2",2000,"imagen2","abc123",17)
productos.addProduct("producto3","description3",3000,"imagen3","abc123",21)
productos.addProduct("producto4","description4",4000,"imagen4","abc123",25)
console.log(productos);

productos.getProductById()
productos.getProductById(2);
productos.getProductById(5)
productos.getProductById(4)