const db = require("../../../db/config");

const list = async (product_id) => {
  const [rows] = await db.pool.execute(
    "SELECT * FROM product_variants WHERE product_id = ? ORDER BY id DESC",
    [product_id],
  );
  return rows;
};

const createModal = async (req) => {
  const { product_id } = req.params;
  const { size, color, quantity, price, sku } = req.body;

  const query =
    "INSERT INTO product_variants (product_id, size, color, quantity, price, sku, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())";
  const values = [
    product_id,
    size || null,
    color || null,
    quantity,
    price,
    sku || null,
  ];

  const [result] = await db.pool.execute(query, values);
  return result;
};

const updateModal = async (req) => {
  const { id } = req.params;
  const { size, color, quantity, price, sku } = req.body;

  const query =
    "UPDATE product_variants SET size = ?, color = ?, quantity = ?, price = ?, sku = ?, updated_at = NOW() WHERE id = ?";
  const values = [
    size || null,
    color || null,
    quantity,
    price,
    sku || null,
    id,
  ];

  const [result] = await db.pool.execute(query, values);
  return result;
};

const deleteModal = async (req) => {
  const { id } = req.params;

  const [existing] = await db.pool.execute(
    "SELECT id FROM product_variants WHERE id = ?",
    [id],
  );
  if (existing.length === 0) return { notFound: true };

  const [result] = await db.pool.execute(
    "DELETE FROM product_variants WHERE id = ?",
    [id],
  );
  return result;
};

module.exports = { list, createModal, updateModal, deleteModal };
