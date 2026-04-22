const db = require("../../../db/config");

const list = async () => {
  try {
    const [rows] = await db.pool.execute(
      "SELECT p.*, p.base_price AS price, c.name AS category_name FROM products p LEFT JOIN categories c ON c.id = p.category_id ORDER BY p.id DESC",
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

const createModal = async (req, res, next) => {
  try {
    const {
      name,
      slug,
      description,
      category_id,
      brand,
      base_price,
      is_active,
    } = req.body;

    const query =
      "INSERT INTO products (name, slug, description, category_id, brand, base_price, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())";

    const values = [
      name,
      slug,
      description || null,
      category_id || null,
      brand || null,
      base_price ?? null,
      is_active !== undefined ? is_active : 1,
    ];

    const [result] = await db.pool.execute(query, values);

    return {
      ...result,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  list,
  createModal,
};
