import { router as ping } from "../routes/ping.js";

export const config = (app) => {
  // Register routes
  app.use("/ping", ping);
};
