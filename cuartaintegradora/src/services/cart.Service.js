export default class cartServiceManager{
    constructor(carritoManager){
        this.carritoManager=carritoManager
    }
    getCartById = (cid) => {
        return this.carritoManager.getCartById(cid);
      };
      createCart = () => {
        return this.carritoManager.createCart();
      };
      updateCart = (id, cart) => {
        return this.carritoManager.updateCart(id, cart);
      };
      deleteCart = () => {
        return this.carritoManager.deleteCart(id);
      };
}