const db = require("../../../db/config");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

const list = async () => {
  try {
    const [rows] = await db.pool.execute(
      "SELECT id, username, email, is_active, created_at, updated_at FROM users ORDER BY id DESC",
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

const createModal = async (req) => {
  try {
    const { username, email, password, is_active } = req.body;
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const query =
      "INSERT INTO users (username, email, password, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())";

    const values = [
      username,
      email,
      hashedPassword,
      is_active !== undefined ? is_active : 1,
    ];

    const [result] = await db.pool.execute(query, values);
    return result;
  } catch (error) {
    throw error;
  }
};

const updateModal = async (req) => {
  try {
    const { id } = req.params;
    const { username, email, password, is_active } = req.body;

    let query =
      "UPDATE users SET username = ?, email = ?, is_active = ?, updated_at = NOW() WHERE id = ?";
    let values = [username, email, is_active, id];

    if (password && String(password).trim() !== "") {
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      query =
        "UPDATE users SET username = ?, email = ?, password = ?, is_active = ?, updated_at = NOW() WHERE id = ?";
      values = [username, email, hashedPassword, is_active, id];
    }

    const [result] = await db.pool.execute(query, values);
    return result;
  } catch (error) {
    throw error;
  }
};

const deleteModal = async (req) => {
  try {
    const { id } = req.params;

    const checkQuery = "SELECT id, username FROM users WHERE id = ?";
    const [existingUser] = await db.pool.execute(checkQuery, [id]);

    if (existingUser.length === 0) {
      return { notFound: true };
    }

    const deleteQuery = "DELETE FROM users WHERE id = ?";
    const [result] = await db.pool.execute(deleteQuery, [id]);

    return {
      ...result,
      deletedId: Number(id),
      username: existingUser[0].username,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  list,
  createModal,
  updateModal,
  deleteModal,
  comparePassword: (plainPassword, hashedPassword) =>
    bcrypt.compare(plainPassword, hashedPassword),
};
