import bcrypt from "bcrypt";

// Function to encrypt (hash) a password
async function encryptPassword(password) {
  const saltRounds = 10;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error(`Password encryption failed: ${error.message}`);
  }
}

// Function to compare a password with its encrypted (hashed) version
async function comparePassword(inputPassword, hashedPassword) {
  try {
    const passwordMatched = await bcrypt.compare(inputPassword, hashedPassword);
    return passwordMatched;
  } catch (error) {
    throw new Error(`Failed to check password${error.message}`);
  }
}

export { encryptPassword, comparePassword };
