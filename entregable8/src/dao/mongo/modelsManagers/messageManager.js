import {messageModel}  from "../models/message.model.js";
class messageMananger {
    constructor() {}
  
    async getMessage() {
      let listaMensajes = [];
      try {
        listaMensajes = await messageModel.find().lean();
      } catch (err) {
        console.log("fallo la consulta" + err);
      }
      return listaMensajes;
    }
  
    async createMessage(usuario, mensaje) {
      let arrayMessage = { usuario: usuario, mensaje: mensaje };
  
      await messageModel.create(arrayMessage);
    }
  }
  
  export default messageMananger;