import userModel from "../models/user.model.js";

async function signup(req, res) {
  const { name, email, password } = req.body;

  try {
    const user = new userModel({
      name,
      email,
      password,
    });

    const data = await user.save();
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
}

export { signup };
