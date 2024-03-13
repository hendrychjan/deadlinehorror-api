// Read environment variables from .env file
import * as dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const config = () => {
  // Load the contents of the .env file into process.env according to the type of the environment
  dotenv.config({ path: `${__dirname}/../../.env` });
};
