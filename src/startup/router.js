import { handleErrors } from "../middleware/handleErrors.js";
import { router as ping } from "../routes/ping.js";
import { router as users } from "../routes/users.js";

export const config = (app) => {
  // Register routes
  app.use("/ping", ping);
  app.use("/users", users);

  app.use(handleErrors);
};
