const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { resError, resSuccess } = require("../../common/utils/response");
const { loginValidation } = require("./auth.validation");
const { findUserByEmail, findUserById } = require("./auth.model");

const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_SECRET || "g5_access_secret";
const REFRESH_TOKEN_SECRET =
  process.env.JWT_REFRESH_SECRET || "g5_refresh_secret";
const ACCESS_TOKEN_EXPIRES_IN = process.env.JWT_ACCESS_EXPIRES_IN || "10s"; // revoke, token

// stateless
//- stole token (use forever)
//+ limit token lifetime (5s, 15m, 1h)
//+ check refresh token

const REFRESH_TOKEN_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || "7d";

const login = async (req, res, next) => {
  try {
    const validate = loginValidation(req.body);
    if (!validate.result) {
      return resError(res, "Validation failed", 400, validate.errors);
    }

    const { email, password } = req.body;
    const user = await findUserByEmail(email);

    if (!user) {
      return resError(res, "Invalid email or password", 401);
    }

    if (Number(user.is_active) !== 1) {
      return resError(res, "User account is inactive", 403);
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return resError(res, "Invalid email or password", 401);
    }

    const tokenPayload = {
      id: user.id,
      email: user.email,
      username: user.username,
    };

    const accessToken = jwt.sign(tokenPayload, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    });

    const refreshToken = jwt.sign(tokenPayload, REFRESH_TOKEN_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    });

    return resSuccess(
      res,
      {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          is_active: user.is_active,
        },
        accessToken,
        refreshToken,
      },
      "Login successful",
    );
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    // Read refresh token from body or Authorization header
    const token =
      req.body?.refreshToken ||
      req.headers["x-refresh-token"] ||
      (req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null);

    if (!token) {
      return resError(res, "Refresh token is required", 401);
    }

    let decoded;
    try {
      decoded = jwt.verify(token, REFRESH_TOKEN_SECRET);
    } catch (err) {
      return resError(res, "Invalid or expired refresh token", 401);
    }

    const user = await findUserById(decoded.id);

    if (!user) {
      return resError(res, "User not found", 401);
    }

    if (Number(user.is_active) !== 1) {
      return resError(res, "User account is inactive", 403);
    }

    const tokenPayload = {
      id: user.id,
      email: user.email,
      username: user.username,
    };

    const newAccessToken = jwt.sign(tokenPayload, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    });

    const newRefreshToken = jwt.sign(tokenPayload, REFRESH_TOKEN_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    });

    return resSuccess(
      res,
      {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          is_active: user.is_active,
        },
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      },
      "Token refreshed successfully",
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  refreshToken,
};
