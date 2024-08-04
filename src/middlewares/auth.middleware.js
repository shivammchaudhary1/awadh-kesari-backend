import { jwtVerify } from "##/src/config/lib/jwt.js";
import User from "##/src/models/user.model.js";
import { checkRole } from "##/utility/checkRole.js";

async function isAuthenticated(req, res, next) {
  try {
    const [, token] = req.headers.authorization.split(" ");
    const { userId } = jwtVerify(token, "access");
    const user = await User.findById(userId);
    req.user = user;
    return next();
  } catch (error) {
    return res
      .status(401)
      .json({
        message: "Session Expired, Please Login again",
        error: error.message,
      });
  }
}

// Using currying method for Role Based User Access
function isRouteAllowed(rolesAllowed) {
  try {
    // eslint-disable-next-line no-inner-declarations
    function verifyRole(req, res, next) {
      if (checkRole(rolesAllowed, req.user.role)) {
        return next();
      }
      return res
        .status(401)
        .json({ message: "You aren't authorized to this route" });
    }
    return verifyRole;
  } catch (error) {
    return { message: "Server internal error", error: error.message };
  }
}

export { isAuthenticated, isRouteAllowed };
