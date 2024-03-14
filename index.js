import express from "express";

import { config as envConfig } from "./src/startup/env.js";
import { config as middlewareConfig } from "./src/startup/middleware.js";
import { config as routerConfig } from "./src/startup/router.js";
import { connect as dbConnect } from "./src/startup/db.js";

const app = express();
const port = process.env.PORT || 3000;

// Load startup configs
envConfig();
middlewareConfig(app);
routerConfig(app);
dbConnect();

app.listen(port, () => {
  console.log(`[INFO] Express is listening at http://localhost:${port}`);
});