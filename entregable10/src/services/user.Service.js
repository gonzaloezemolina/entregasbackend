export default class UsersService {
    constructor(usuarioManager) {
      this.usuarioManager = usuarioManager;
    }
    getUsers = () => {
      return this.usuarioManager.getUsers(params);
    };
    getUserBy = () => {
      return this.usuarioManager.getUserBy(params);
    };
    createUser = () => {
      return this.usuarioManager.createUser(user);
    };
    updateUser = () => {
      return this.usuarioManager.updateUser(id, user);
    };
    deleteUser = () => {
      return this.usuarioManager.deleteUser(id);
    };
  }