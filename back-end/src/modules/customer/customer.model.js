const db = require("../../../db/config");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

const list = async () => {
  try {
    const [rows] = await db.pool.execute(
      "SELECT id, first_name, last_name, email, is_active, created_at, updated_at FROM customer ORDER BY id DESC",
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

const createModal = async (req) => {
  try {
    const { first_name, last_name, email, password, is_active } = req.body;
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const query =
      "INSERT INTO customer (first_name, last_name, email, password, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())";

    const values = [
      first_name,
      last_name,
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
    const { first_name, last_name, email, password, is_active } = req.body;

    let query =
      "UPDATE customer SET first_name = ?, last_name = ?, email = ?, is_active = ?, updated_at = NOW() WHERE id = ?";
    let values = [first_name, last_name, email, is_active, id];

    if (password && String(password).trim() !== "") {
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      query =
        "UPDATE customer SET first_name = ?, last_name = ?, email = ?, password = ?, is_active = ?, updated_at = NOW() WHERE id = ?";
      values = [first_name, last_name, email, hashedPassword, is_active, id];
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

    const checkQuery =
      "SELECT id, first_name, last_name FROM customer WHERE id = ?";
    const [existingCustomer] = await db.pool.execute(checkQuery, [id]);

    if (existingCustomer.length === 0) {
      return { notFound: true };
    }

    const deleteQuery = "DELETE FROM customer WHERE id = ?";
    const [result] = await db.pool.execute(deleteQuery, [id]);

    return {
      ...result,
      deletedId: Number(id),
      customerName: `${existingCustomer[0].first_name} ${existingCustomer[0].last_name}`,
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
