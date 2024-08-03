import authRoutes from "./auth.routes.js";

const allRoutes = (app) => {
  app.use("/api/auth", authRoutes);
};

export { allRoutes };
