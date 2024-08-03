import User from "../models/user.model.js";
import { isValidEmail, checkPassStrength } from "../utility/validate.js";
import { encryptPassword, comparePassword } from "../config/bcrypt.js";
import { signJwt, jwtVerify } from "../config/jwt.js";

const register = async (req, res) => {
  try {
    const { name, email, password, mobile, role, status } = req.body;

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Email is invalid" });
    }

    if (!checkPassStrength(password)) {
      return res.status(400).json({
        message:
          "Password should have one uppercase letter, one number, and minimum 6 characters",
      });
    }

    // Check if user exists
    const isUserExist = await User.findOne({ email }).lean();

    if (isUserExist) {
      return res
        .status(400)
        .json({ message: "User already exists, please login" });
    }

    const hashedPassword = await encryptPassword(password);

    // Create user document
    const user = new User({
      name,
      email,
      password: hashedPassword,
      mobile,
      role,
      status,
    });

    await user.save();

    return res
      .status(201)
      .json({ message: "User Registration Successful", user: { email } });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "User Registration Failed", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const isPasswordCorrect = await comparePassword(password, user.password);

    if (isPasswordCorrect) {
      const token = signJwt(
        { userId: user._id, role: user.role },
        "7d",
        "access"
      );

      return res
        .status(200)
        .json({
          message: "Login Successful",
          token,
          userId: user._id,
          role: user.role,
         });
    }
    return res.status(401).json({ message: "Email or password is incorrect" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Login Failed", error: error.message });
  }
};

export { register, login };
