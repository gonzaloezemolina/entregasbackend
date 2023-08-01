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

//     try {
//         await testProductManager.addProduct("Product 1", "Description 1", 100, "image1.jpg", "ABC123", 10);
//         await testProductManager.addProduct("Product 2", "Description 2", 200, "image2.jpg", "ABC123", 11);
//         await testProductManager.addProduct("Product 3", "Description 3", 300, "image3.jpg", "ABC123", 12);
//         await testProductManager.addProduct("Product 4", "Description 4", 400, "image4.jpg", "ABC123", 13);
//         await testProductManager.addProduct("Product 5", "Description 5", 500, "image5.jpg", "ABC123", 14);

//         const allProducts = await testProductManager.getProducts();
//         console.log("All Products:", allProducts);

//         const productById = await testProductManager.getProductById(7);
//         console.log("Product with ID 7:", productById);

//         await testProductManager.deleteProductById(3);
//         console.log("Product with ID 3 deleted.");

//         await testProductManager.updateProductById({
//             title: "Product Attempt",
//             description: "Description attempt",
//             price: 1010,
//             thumbnail: "Image 10.jpg",
//             code: "ABC123",
//             stock: 6,
//             id: 9
//         });
//         console.log("Product with ID 9 updated.");

//     } catch (error) {
//         console.error("Error:", error);
//     }
// })();