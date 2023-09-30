import passport from "passport";
import local from "passport-local"
import auth from "../services/auth.js";
import userManager from "../dao/mongo/modelsManagers/userManager.js";
import { Strategy} from "passport-local";
import { ExtractJwt } from "passport-jwt";
import { cookieExtractor } from "../utils.js";

const usersService = new userManager();

const LocalStrategy = local.Strategy;

const initializePassportStrategies = () =>{

    passport.use('register',new LocalStrategy({passReqToCallback:true,usernameField:'email',session:false},async(req,email,password,done)=>{
        const {firstName, lastName} = req.body;
        if(!firstName||!lastName) return done(null,false,{message:'Incomplete values'});

        const exists = await usersService.getBy({email});
        if(exists) return done(null,false,{message:'User already exists'});

        const hashedPassword = await auth.createHash(password);
        const newUser = {
            firstName,
            lastName,
            email,
            password:hashedPassword
        }
        const result = await usersService.create(newUser);
        done(null,result);
    }));

    passport.use('login', new LocalStrategy({usernameField:'email', session:false},async(email,password,done)=>{
        const user = await usersService.getBy({email});
        if(!user) return done(null,false,{message:'Incorrect Credentials'});
       
        const isValidPassword = await auth.validatePassword(password,user.password);
        if(!isValidPassword) return done(null,false,{message:'Incorrect Credentials'});
        done(null,user);
    }));

    passport.use('jwt',new Strategy({
        jwtFromRequest:ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey:'jwtSecret'
    },async(payload, done)=>{
        return done(null,payload)
    }))

}

export default initializePassportStrategies;

// // passport-config.js
// import passport from 'passport';
// import { Strategy as LocalStrategy } from 'passport-local';
// import bcrypt from 'bcrypt';
// import userModel from '../dao/mongo/models/user.model.js';

// function initializePassport() {
//   passport.use(
//     new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
//       try {
//         // Busca el usuario en la base de datos por su correo electrónico.
//         const user = await userModel.findOne({ email });

//         // Si no se encuentra el usuario, devolver un error.
//         if (!user) {
//           return done(null, false, { message: 'Correo electrónico no registrado.' });
//         }

//         // Compara la contraseña ingresada con la contraseña almacenada en la base de datos.
//         const isMatch = await bcrypt.compare(password, user.password);

//         // Si las contraseñas no coinciden, devolver un error.
//         if (!isMatch) {
//           return done(null, false, { message: 'Contraseña incorrecta.' });
//         }

//         // Si las credenciales son válidas, devolver el usuario.
//         return done(null, user);
//       } catch (error) {
//         return done(error);
//       }
//     })
//   );

//   passport.serializeUser((user, done) => {
//     done(null, user.id);
//   });

//   passport.deserializeUser(async (id, done) => {
//     try {
//       // Busca al usuario por su ID en la base de datos.
//       const user = await userModel.findById(id);
//       done(null, user);
//     } catch (error) {
//       done(error);
//     }
//   });
// }

// export default initializePassport;