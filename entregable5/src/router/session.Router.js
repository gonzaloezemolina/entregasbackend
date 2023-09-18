import {Router} from 'express'
import userManager from '../dao/mongo/modelsManagers/userManager';
const router = Router();

const usersService = new userManager()

router.post("/register", async (req, res) => {
    const { firstName, lastName, email, age, password } = req.body;
    if (!firstName || !email || !password)
      return res
        .status(400)
        .send({ status: "error", error: "Incomplete values" });
  
    const userRegistered = await usersService.getBy({ email });
    if (userRegistered) {
      return res
        .send({ status: "error", error: "User already registered" })
        .redirect("/session/login");
    } else {
      const newUser = {
        firstName,
        lastName,
        email,
        age,
        password,
      };
      const result = await usersService.create(newUser);
  
      res.send({ status: "success", payload: result._id });
    }
  });
  
  router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
      req.session.admin = true;
      res.send({ status: "success", message: "Logueado" });
    }
    if (!email || !password)
      return res
        .status(400)
        .send({ status: "error", error: "Incomplete values" });
    const user = await usersService.getBy({ email, password });
    if (!user)
      return res
        .status(400)
        .send({ status: "error", error: "Incorrect Credentials" });
  
    req.session.user = user;
    res.send({ status: "success", message: "Logueado" });
  });
  
  router.get("/logout", async (req, res) => {
    req.session.destroy((error) => {
      if (error) {
        console.log(error);
        return res.redirect("/");
      } else {
        res.redirect("/");
      }
    });
  });
export default router