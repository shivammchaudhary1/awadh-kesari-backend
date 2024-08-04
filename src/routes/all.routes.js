import articleRoutes from "./article.routes.js";
import authRoutes from "./auth.routes.js";
import adminRoutes from "./admin.routes.js";
import commentRoutes from "./comment.routes.js";

const allRoutes = (app) => {
  app.use("/api/auth", authRoutes);
  app.use("/api/article", articleRoutes);
  app.use("/api/admin", adminRoutes);
  app.use("/api/comment", commentRoutes);
};

export { allRoutes };
