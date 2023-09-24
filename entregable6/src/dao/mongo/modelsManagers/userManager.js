import userModel from "../models/user.model.js";
export default class userManager{
    get = () => {
        return userModel.find().lean();
    }

    getBy = (params) => {
        return userModel.findById(params).lean();
    }

    create = (user) => {
        return userModel.create(user);
    }
}