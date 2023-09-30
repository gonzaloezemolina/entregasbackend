import jwt from 'jsonwebtoken';

export const validateJWT = (req, res, next) =>{
    const authHeader = req.headers.authorization;
    if(!authHeader) return res.status(401).send({status:"error",error:"Not logged"});
    const token = authHeader.split(' ')[1];
    try{
        const userInfo = jwt.verify(token,'secretjwt');
        req.user = userInfo;
        next();
    }catch(error){
        console.log(error);
        res.status(401).send({status:"error",error:"TOKEN error"})
    }
}