const db = require("../../../db/config");

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
  createModal,
};
