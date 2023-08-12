import { promises as fs } from "fs";
const { writeFile, readFile } = fs;

export default class ProductManager {
    constructor() {
        this.path = "./products.json";
        this.products = [];
    }

    static id = 0

    addProduct = async (title,description,price,thumbnail,code,stock) => {
        ProductManager.id++
        let newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: ProductManager.id
        }

        const existingProducts = await this.readProducts();

        this.products = [...existingProducts, newProduct]

        await fs.writeFile(this.path, JSON.stringify(this.products))
    }


    readProducts = async () => {
        try {
            let readProduct = await fs.readFile(this.path, "utf-8");
            const parsedProducts = JSON.parse(readProduct);
            if (Array.isArray(parsedProducts)) {
                return parsedProducts
            } else if (typeof parsedProducts === "object") {
                return [parsedProducts]
            }
        } catch (error) {
            console.error("Error reading products:", error);
            return []; 
        }
    };

    getProducts = async () => { 
        let getProduct = await this.readProducts()
        return getProduct;
    }

    getProductById = async (id) => {
        let allProducts = await this.readProducts();
        console.log("All Products:", allProducts);
        return allProducts.find(product => product.id === id) || null
    }

    updateProductById = async ({id,...producto}) => {
        await this.deleteProductById(id);
        let prodOld = await this.readProducts();
        let productUpdated = [
            {...producto, id},
            ...prodOld
        ];
        await fs.writeFile(this.path, JSON.stringify(productUpdated));
    }


    deleteProductById = async (id) => {
        let allProducts = await this.readProducts();
        let productFilter = allProducts.filter(product => product.id !== id)
        await fs.writeFile(this.path, JSON.stringify(productFilter))
        console.log("Product eliminated");
    }
}

// (async () => {
//     const testProductManager = new ProductManager();

//         try{
//             await testProductManager.addProduct("Product1", "description1", 1000, "imagen.jpg", "Abc123", 10 )


//             const allProducts = await testProductManager.getProducts();
//             console.log("All Products:", allProducts);

//         } catch (error) {
//             console.log("Error", error);
//         }
// })
