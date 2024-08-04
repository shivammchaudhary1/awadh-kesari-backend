import articleRoutes from "./article.routes.js";
import authRoutes from "./auth.routes.js";

const allRoutes = (app) => {
  app.use("/api/auth", authRoutes);
  app.use("/api/article", articleRoutes);
};

export { allRoutes };
