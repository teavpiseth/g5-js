const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { resError, resSuccess } = require("../../common/utils/response");
const { loginValidation } = require("./auth.validation");
const { findUserByEmail } = require("./auth.model");

const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_SECRET || "g5_access_secret";
const REFRESH_TOKEN_SECRET =
  process.env.JWT_REFRESH_SECRET || "g5_refresh_secret";
const ACCESS_TOKEN_EXPIRES_IN = process.env.JWT_ACCESS_EXPIRES_IN || "15m";
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

module.exports = {
  login,
};
