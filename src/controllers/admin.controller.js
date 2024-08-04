import User from "../models/user.model.js";
import Article from "../models/article.model.js";

// Get all users with pagination
const getAllUsers = async (req, res) => {
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

    // Fetch users
    const users = await User.find()
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber)
      .exec();

    // Fetch total count for pagination info
    const totalCount = await User.countDocuments();

    return res.status(200).json({
      totalCount,
      page: pageNumber,
      limit: limitNumber,
      users,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch users", error: error.message });
  }
};

// Get all reporters with pagination
const getAllReporters = async (req, res) => {
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

    // Fetch reporters (assuming reporters have a specific role or attribute)
    const reporters = await User.find({ role: "reporter" }) // Adjust the query based on how reporters are identified
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber)
      .exec();

    // Fetch total count for pagination info
    const totalCount = await User.countDocuments({ role: "reporter" });

    return res.status(200).json({
      totalCount,
      page: pageNumber,
      limit: limitNumber,
      reporters,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch reporters", error: error.message });
  }
};

// Update status of a user
const updateStatusOfUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate that status is provided
    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    // Update user status
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "User status updated successfully", updatedUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to update user status", error: error.message });
  }
};

// Get all articles with pagination in descending order
const allArticles = async (req, res) => {
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

    // Fetch articles in descending order
    const articles = await Article.find()
      .sort({ createdAt: -1 }) // Sort by creation date in descending order
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber)
      .exec();

    // Fetch total count for pagination info
    const totalCount = await Article.countDocuments();

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

const updateArticleVerification = async (req, res) => {
  try {
    const { articleId } = req.params;
    const { verified } = req.body;

    // Validate that 'verified' is provided and is a boolean
    if (typeof verified !== "boolean") {
      return res
        .status(400)
        .json({ message: "The 'verified' field must be a boolean value" });
    }

    // Find and update the article's verification status
    const updatedArticle = await Article.findByIdAndUpdate(
      articleId,
      { verified },
      { new: true } // Return the updated document
    );

    if (!updatedArticle) {
      return res.status(404).json({ message: "Article not found" });
    }

    return res.status(200).json({
      message: "Article verification status updated successfully",
      updatedArticle,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update article verification status",
      error: error.message,
    });
  }
};

export {
  getAllUsers,
  getAllReporters,
  updateStatusOfUser,
  allArticles,
  updateArticleVerification,
};
