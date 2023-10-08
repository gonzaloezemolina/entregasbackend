import { Router } from "express";
export default class baseRouter {
    constructor(){
        this.router = Router()
        this.init();
    }

    init(){}

    getRouter () {
        return this.router;
    }

    get(path,...callbacks){
        this.router.get(path,this.generateCustomResponses,this.applyCallbacks(callbacks))
    }

    post(path,...callbacks){
        this.router.post(path,this.generateCustomResponses,this.applyCallbacks(callbacks))
    }

    put(path,...callbacks){
        this.router.put(path,this.generateCustomResponses,this.applyCallbacks(callbacks))
    }

    delete(path,...callbacks){
        this.router.delete(path,this.generateCustomResponses,this.applyCallbacks(callbacks))
    }

    generateCustomResponses(req,res,next){
        console.log("Aqui");
        res.sendSuccess = message => res.send({status:"success",message})
        res.sendSuccessWithPayload = payload => res.send({status:"success",payload})
        res.sendInternalError = err => res.status(500).send({status:"error", err})
    }

    applyCallbacks(callbacks){
        return callbacks.map(callback => async(...params)=>{
            try{
                await callback.apply(this,params);
            } catch (error){
                console.log(error);
                params[1].sendInternalError(error)
            }
        })
    }
}