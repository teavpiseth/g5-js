const jwt = require("jsonwebtoken");
const { unauthorized } = require("../common/utils/response");

const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_SECRET || "g5_access_secret";

/**
 * Authentication middleware to verify JWT token
 * Checks Authorization header for Bearer token
 */
const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return unauthorized(res, "No token provided");
    }

    const token = authHeader.slice(7); // Remove "Bearer " prefix

    try {
      const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
      req.user = decoded;
      next();
    } catch (jwtError) {
      if (jwtError.name === "TokenExpiredError") {
        return unauthorized(res, "Token expired");
      }
      if (jwtError.name === "JsonWebTokenError") {
        return unauthorized(
          res,
          "You are not authorized to access this resource",
        );
      }
      return unauthorized(res, "Token verification failed");
    }
  } catch (error) {
    return unauthorized(res, "Authentication error");
  }
};

module.exports = authMiddleware;
