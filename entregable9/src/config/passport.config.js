import passport from "passport";
import auth from "../services/auth.js";
import userManager from "../dao/mongo/modelsManagers/userManager.js";
import { Strategy as LocalStrategy} from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";


const usersService = new userManager();


const initializePassportStrategies = () =>{

    passport.use('register',new LocalStrategy({passReqToCallback:true,usernameField:'email',session:false},
    async(req,email,password,done)=>{
        const {firstName, lastName} = req.body;
        if(!firstName||!lastName) return done(null,false,{message:'Incomplete values'});

        const exists = await usersService.getUserById({email});
        if(exists) return done(null,false,{message:'User already exists'});

        const hashedPassword = await auth.createHash(password);
        const newUser = {
            firstName,
            lastName,
            email,
            password:hashedPassword
        }

        let cart;
        if (req.cookies["cart"]) {
          cart = req.cookies["cart"];
        } else {
          const cartResult = await cartsService.createCart();
          cart = cartResult.id;
        }
        newUser.cart = cart;


        const result = await usersService.createUser(newUser);
        done(null,result);
    }));

    passport.use('login', new LocalStrategy({usernameField:'email', session:false},async(email,password,done)=>{
    try{
       const user = await usersService.getUserById({email});
        if(!user) return done(null,false,{message:'Incorrect Credentials'});
       
        const isValidPassword = await auth.validatePassword(password,user.password);
        if(!isValidPassword) return done(null,false,{message:'Incorrect Credentials'});
        done(null,user);
    }catch(error){
        console.log(error);
        return done (error)
    }
}));

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest:ExtractJwt.fromExtractors([auth.extractAuthToken]),
        secretOrKey:'jwtSecret'
    },async(payload, done)=>{
        return done(null,payload)
    }))

}

export default initializePassportStrategies;
