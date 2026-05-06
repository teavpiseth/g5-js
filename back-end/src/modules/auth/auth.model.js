const db = require("../../../db/config");

const findUserByEmail = async (email) => {
  try {
    const query =
      "SELECT id, username, email, password, is_active FROM users WHERE email = ? LIMIT 1";
    const [rows] = await db.pool.execute(query, [email]);

    if (!rows.length) {
      return null;
    }

    return rows[0];
  } catch (error) {
    throw error;
  }
};

const findUserById = async (id) => {
  try {
    const query =
      "SELECT id, username, email, is_active FROM users WHERE id = ? LIMIT 1";
    const [rows] = await db.pool.execute(query, [id]);

    if (!rows.length) {
      return null;
    }

    return rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  findUserByEmail,
  findUserById,
};
