import { Router } from "express";
import messageManager from "../dao/mongo/modelsManagers/messageManager.js"
const messageRouter = Router()
let messManager = new messageManager

//Obtener mensaje
messageRouter.get("/message", async(req,res) => {
    res.send(await messManager.getMessage())
})

//Crear mensaje
messageRouter.post("/message",async (req,res) => {
    let {usuario,mensaje} = param.body
    res.send(await messManager.createMessage(usuario,mensaje))
})

export default messageRouter