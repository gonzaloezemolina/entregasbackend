import {Router} from 'express'
import userManager from '../dao/mongo/modelsManagers/userManager.js';
import passport from 'passport';

const usersService = new userManager()
const sessionRouter = Router();

//Register
sessionRouter.post("/register", async (req, res) => {
    const { firstName, lastName, email, age, password } = req.body;
    if (!firstName || !email || !password)
      return res
        .status(400)
        .send({ status: "error", error: "Incomplete values" });
  
    const userRegistered = await usersService.getBy({ email });
    if (userRegistered) {
      return res
        .send({ status: "error", error: "User already registered" })
        .redirect("/login");
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
  

  //Login
  sessionRouter.post("/login", async (req, res) => {
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
  

  //Logout
  sessionRouter.get("/logout", async (req, res) => {
    req.session.destroy((error) => {
      if (error) {
        console.log(error);
        return res.redirect("/");
      } else {
        res.redirect("/login");
      }
    });
  });

  //login con passport github
sessionRouter.get(
  "/github",
  passport.authenticate("github", { scope: "user:email" }),
  async (req, res) => {}
);

sessionRouter.get(
  "/githubCallBack",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req, res) => {
    console.log(req.user);
    req.session.user = {
      fist_name: req.user.first_name,
      last_name: req.user.last_name,
      age: req.user.age,
      email: req.user.email,
      admin: req.user.admin,
    };
    const access_token = generateToken(req.user);
    res.redirect("/");
  }
);


//registro con passport
sessionRouter.post(
  "/register",
  passport.authenticate("register"),
  async (req, res) => {
    const access_token = generateToken(req.user);
    res.send({ status: "success", access_token });
  }
);
export default sessionRouter