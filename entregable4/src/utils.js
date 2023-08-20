import { dirname } from "path";
import { fileURLToPath } from "url";
import path from 'path'; 

export const __dirname = dirname(fileURLToPath(import.meta.url));
function loadJsonFile(filePath) {
    const absolutePath = path.resolve(__dirname, filePath);
    return require(absolutePath);
  }
  
  export default loadJsonFile;