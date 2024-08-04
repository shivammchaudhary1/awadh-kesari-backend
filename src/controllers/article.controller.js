import Article from "../models/article.model.js";
import User from "../models/user.model.js";

const createArticle = async (req, res) => {
  try {
    const {
      reporterId,
      title,
      subheading,
      content,
      category,
      images,
      videoLink,
    } = req.body;

    // Check for required fields
    if (!reporterId || !title || !content || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    console.log("reporterId", reporterId);
    const article = await Article.create({
      reporterId,
      title,
      subheading,
      content,
      category,
      images,
      videoLink,
    });

    return res
      .status(201)
      .json({ message: "Article created successfully", article });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Article creation failed", error: error.message });
  }
};

// Get All Articles with Pagination

const getAllArticles = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    // Convert page and limit to numbers
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    // Validate page and limit
    if (pageNumber < 1 || limitNumber < 1) {
      return res
        .status(400)
        .json({ message: "Page and limit must be positive integers" });
    }

    // Fetch articles that are verified
    const articles = await Article.find({ verified: true })
      .sort({ createdAt: -1 }) // Optional: Sort by creation date in descending order
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber)
      .exec();

    // Fetch total count of verified articles for pagination info
    const totalCount = await Article.countDocuments({ verified: true });

    return res.status(200).json({
      totalCount,
      page: pageNumber,
      limit: limitNumber,
      articles,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch articles", error: error.message });
  }
};

// Get Single Article by ID
const getArticleById = async (req, res) => {
  try {
    const { articleId } = req.params;
    const article = await Article.findById(articleId);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    return res.status(200).json({ article });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch article", error: error.message });
  }
};

// Delete Article by ID
const deleteArticleById = async (req, res) => {
  try {
    const { articleId } = req.params;

    const deletedArticle = await Article.findByIdAndDelete(articleId);

    if (!deletedArticle) {
      return res.status(404).json({ message: "Article not found" });
    }

    return res.status(200).json({ message: "Article deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to delete article", error: error.message });
  }
};

// Get Articles by Reporter ID with Pagination
const getArticlesByReporterId = async (req, res) => {
  try {
    const { reporterId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    // Convert page and limit to numbers
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    // Validate page and limit
    if (pageNumber < 1 || limitNumber < 1) {
      return res
        .status(400)
        .json({ message: "Page and limit must be positive integers" });
    }

    // Fetch articles
    const articles = await Article.find({ reporterId })
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber)
      .exec();

    // Fetch total count for pagination info
    const totalCount = await Article.countDocuments({ reporterId });

    return res.status(200).json({
      totalCount,
      page: pageNumber,
      limit: limitNumber,
      articles,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch articles", error: error.message });
  }
};

// Update Article by ID (Only provided fields)
const updateArticleById = async (req, res) => {
  try {
    const { articleId } = req.params;
    const updateData = req.body;

    // Validate that at least one field is provided
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No fields provided for update" });
    }

    // Perform the update
    const updatedArticle = await Article.findByIdAndUpdate(
      articleId,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedArticle) {
      return res.status(404).json({ message: "Article not found" });
    }

    return res
      .status(200)
      .json({ message: "Article updated successfully", updatedArticle });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to update article", error: error.message });
  }
};

export {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticleById,
  deleteArticleById,
  getArticlesByReporterId,
};
