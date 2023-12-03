import supertest from "supertest";
import chai from "chai";
import productManager from "../src/dao/mongo/modelsManagers/productosManager.js";

// describe('test unitario para DAO de Product', function()
// {
//     this.timeout(TEST_TIMEOUT);
//     let idProduct;

//     before(async function () {await mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })});
//     after(async function () 
//     {
//         await mongoose.disconnect()
//     });
    
//     it('debería agregar un producto correctamente', async function () 
//     {
//         const newProduct = 
//         {
//             title: 'Producto de Prueba',
//             description: 'Descripcion de prueba',
//             category: 'Malbec',
//             code: 'aabd234',
//             status:true,
//             stock:333,
//             price:333,
//             owner:'admin',
//             thumbnail: 'urlimg'
//         };

//         const product = new ProductDao(); 
//         const result = await product.addProduct(newProduct);

//         idProduct = result._id;
//         assert.ok(result._id);
//     });

//     it('debería obtener un producto por su ID correctamente', async function () 
//     {
//         const productId = idProduct;
//         const product = new ProductDao(); 
//         const result = await product.getProductById(productId);

//         assert.ok(result._id);
//     });

//     it('debería actualizar un producto correctamente', async function () 
//     {

//         const productId = idProduct;

//         const updatedProduct = 
//         {
//             title: '___Producto de Prueba',
//             description: '___Descripcion de prueba',
//             category: 'Malbec',
//             code: '___aabd234',
//             status:true,
//             stock:333,
//             price:333,
//             owner:'admin',
//             thumbnail: '___urlimg'
//         };

//         const product = new ProductDao(); 
//         const result = await product.updateProduct(productId, updatedProduct);
//         assert.strictEqual(result.title, updatedProduct.title);
//     });

//     it('debería eliminar un producto correctamente', async function () 
//     {
//         const productId = idProduct;
//         const product = new ProductDao();
//         const result = await product.deleteProduct(productId);
//         assert.strictEqual(result.status, true); 
//     });

// })