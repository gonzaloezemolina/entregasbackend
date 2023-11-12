import productModel from "../models/product.model.js";

export default class productManager{
    getProducts = () => {
        return productModel.find()
    }

    getProductById = (params) => {
        return productModel.findOne(params)
    }

    createProduct = (newProd) => {
        return productModel.create(newProd)
    }

    updateProduct = (id, product) => {
        return productModel.updateOne({_id:id},{$set:product})
    }

    deleteProduct = (id) => {
        return productModel.deleteOne({_id:id})
    }
}