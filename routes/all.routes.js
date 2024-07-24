import userRoutes from "./user.routes.js";

const allRoutes = (app) => {
  app.use("/users", userRoutes);
};

export { allRoutes };
