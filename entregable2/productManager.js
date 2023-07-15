import { promises as fs, writeFile } from "fs";

class ProductManager {
    constructor() {
        this.path = "./products.json";
        this.products = [];
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        const codeProduct = this.products.find((product) => product.code === code);
        if (!codeProduct) {
            if (this.products.length === 0) {
                product.id = 1;
            } else {
                product.id = this.products[this.products.length - 1].id + 1;
            }
            this.products.push(product);
            await fs.writeFile(this.path, JSON.stringify(this.products), "utf8");
        } else {
            return console.log("El código no puede repetirse");
        }
    }


    async getProducts() {
        const allProducts = await fs.readFile(this.path, "utf8");
        let parsedProducts = JSON.parse(allProducts);
        console.log(parsedProducts);
        return parsedProducts;
    }


    async getProductById(productId) {
        let allProducts = await this.getProducts();
        const idProduct = allProducts.find((product) => product.id === productId);
        if (idProduct) {
            console.log(idProduct);
            return idProduct;
        } else {
            return console.log("Not Found");
        }
    }

    async updateById({ id, ...product }) {
        await this.deleteById(id);
        let oldProduct = await this.getProducts();

        let updatedProduct = [{ id, ...product }, ...oldProduct];
        await fs.writeFile(this.path, JSON.stringify(updatedProduct), "utf8");
    }

    async deleteById(id) {
        let products = await fs.readFile(this.path, "utf8");
        let allProducts = JSON.parse(products);
        let deletedProduct = allProducts.filter((product) => product.id !== id);
        await fs.writeFile(this.path, JSON.stringify(deletedProduct), "utf8");

        console.log("Producto eliminado");
        console.log(deletedProduct);
    }
};

//Test
const productos = new ProductManager
productos.addProduct("producto1","description1",1000,"imagen1","abc123",11)
productos.addProduct("producto2","description2",2000,"imagen2","abc123",17)
productos.addProduct("producto3","description3",3000,"imagen3","abc123",21)
productos.addProduct("producto4","description4",4000,"imagen4","abc123",25)
console.log(productos);

productos.getProducts()
productos.getProductById(2);
productos.getProductById(3)
productos.deleteById(4)
productos.updateById({
    title:"new product",
    description:"description",
    price: 5000,
    thumbnail: "imagen5",
    code: "abc123",
    stock: 30,
    id: 5
})

