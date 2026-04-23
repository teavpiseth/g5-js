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

const updateModal = async (req, res, next) => {
  try {
    const { id } = req.params;
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
      "UPDATE products SET name = ?, slug = ?, description = ?, category_id = ?, brand = ?, base_price = ?, is_active = ?, updated_at = NOW() WHERE id = ?";

    const values = [
      name,
      slug,
      description || null,
      category_id || null,
      brand || null,
      base_price ?? null,
      is_active !== undefined ? is_active : 1,
      id,
    ];

    const [result] = await db.pool.execute(query, values);
    return result;
  } catch (error) {
    throw error;
  }
};

const deleteModal = async (req, res, next) => {
  try {
    const { id } = req.params;

    const checkQuery = "SELECT id, name FROM products WHERE id = ?";
    const [existingProduct] = await db.pool.execute(checkQuery, [id]);

    if (existingProduct.length === 0) {
      return { notFound: true };
    }

    const deleteQuery = "DELETE FROM products WHERE id = ?";
    const [result] = await db.pool.execute(deleteQuery, [id]);

    return {
      ...result,
      deletedId: Number(id),
      productName: existingProduct[0].name,
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
};
