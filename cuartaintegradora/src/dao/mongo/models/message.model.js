import moongose from 'mongoose'

const messageSchema = new moongose.Schema({
    usuario:String,
    message:String
})
export const messageModel = moongose.model("message",messageSchema)
