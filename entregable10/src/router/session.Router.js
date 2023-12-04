import passportCall from "../middlewares/passportCall.js";
import baseRouter from "./base.Router.js";
import sessionController from "../controllers/session.controller.js";

class SessionsRouter extends baseRouter {
  init() {
    this.post(
      "/register",
      ["PUBLIC"],
      passportCall("register", { strategyType: "LOCALS" }),
      sessionController.register
    );

    this.post(
      "/login",
      ["NO_AUTH"],
      (req, res, next) => {
        console.log("Middleware ejecutado");
        next();
      },
      passportCall("login", { strategyType: "LOCALS" }),
      (req, res) => {
        console.log("Ruta ejecutada");
        sessionController.login(req, res);
      }
    );

    this.get("/logout", ["AUTH"], sessionController.logout);

    this.get("/current", ["AUTH"], sessionController.current);
  }
}

const sessionsRouter = new SessionsRouter();

export default sessionsRouter.getRouter();