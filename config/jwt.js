import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

function signJwt(payload, exp, tType) {
  let token = "";

  if (tType === "access") {
    token = jwt.sign(payload, process.env.jwtAccessKey, { expiresIn: exp });
  }

  if (tType === "refresh") {
    token = jwt.sign(payload, process.env.jwtPublicKey, { expiresIn: exp });
  }

  return token;
}

function jwtVerify(token, tType) {
  let decodedStatus = {};

  try {
    if (tType === "access") {
      decodedStatus = jwt.verify(token, process.env.jwtAccessKey);
    }

    if (tType === "refresh") {
      decodedStatus = jwt.verify(token, process.env.jwtPublicKey);
    }

    return decodedStatus;
  } catch (error) {
    throw new Error(error.message);
  }
}

//
export { signJwt, jwtVerify };
