import { dirname } from "path";
import { fileURLToPath } from "url";
import  jwt  from "jsonwebtoken";

const private_key = "secr3eto"
export const generateToken = (user) => {
  const token = jwt.sign({ user }, private_key, { expiresIn: "24h" });
  return token;
};

export const cookieExtractor = (req) => {
  let token = null;
  if(req.cookies){
      token = req.cookies['authCookie']
  }
  return token;
}

export const __dirname = dirname(fileURLToPath(import.meta.url));
