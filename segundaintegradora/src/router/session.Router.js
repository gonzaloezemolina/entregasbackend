import passportCall from "../middlewares/passportCall.js";
import baseRouter from "./base.Router.js";
import jwt from 'jsonwebtoken'
import config from "../config/config.js";


class sessionRouter extends baseRouter{
  init() {
    this.post(
      "/register",
      ["NO_AUTH"],
      passportCall("register", { strategyType: "LOCALS" }),
      async (req, res) => {
        res.clearCookie("cart");
        res.sendSuccess("Registered");
      }
    );
    this.post(
      "/login",
      ["NO_AUTH"],
      passportCall("login", { strategyType: "LOCALS" }),
      async (req, res) => {
        const tokenizedUser = {
          name: `${req.user.firstName} ${req.user.lastName}`,
          id: req.user._id,
          role: req.user.role,
          cart: req.user.cart,
        };
        const token = jwt.sign(tokenizedUser, config.jwt.SECRET, {
          expiresIn: "1d",
        });
        res.cookie(config.jwt.COOKIE, token);
        res.clearCookie("cart");
        res.sendSuccess("Logged In");
      }
    );
    this.get("/current", ["AUTH"], async (req, res) => {
      console.log(req.user);
      res.sendSuccessWithPayload(req.user);
    });
  }
}

const SessionRouter = new sessionRouter();
export default SessionRouter.getRouter();