import cartModel from "../models/cart.model";
import productManager from "./productosManager";

export default class cartManager {
    getCarts = () =>{
        return cartModel.find()
    }

    getCartById = (params) => {
        return cartModel.findOne(params)
    }

    addCart = (newCart) => {
        return cartModel.create(newCart)
    }

    updateCart = (id,carrito) => {
        return cartModel.updateOne({_id:id},{$set:carrito})
    }

    deleteCart = (id) => {
        return cartModel.deleteOne({_id:id})
    }
}