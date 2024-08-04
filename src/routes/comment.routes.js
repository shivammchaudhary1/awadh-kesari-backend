import express from "express";
const commentRoutes = express.Router();
import {
  createComment,
  getCommentsByArticle,
} from "../controllers/comment.controller.js";

commentRoutes.post("/create", createComment);
commentRoutes.get("/getCommentsByArticle/:articleId", getCommentsByArticle);

export default commentRoutes;
