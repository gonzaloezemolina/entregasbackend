export default class ProductsService {
    constructor(productoManager) {
      this.productoManager = productoManager;
    }
    getProducts = (params) => {
      return this.productoManager.getProducts(params);
    };
    paginateProducts = () => {
      return this.productoManager.paginateProducts(params, paginateOptions);
    };
    getProductBy = (params) => {
      return this.productoManager.getProductBy(params);
    };
    createProduct = (product) => {
      return this.productoManager.createProduct(product);
    };
    updateProduct = (id, product) => {
      return this.productoManager.updateProduct(id, product);
    };
    deleteProduct = (id) => {
      return this.productoManager.deleteProduct(id);
    };
  }