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

const listWeb = async (categoryId) => {
  try {
    const [categoryRows] = await db.pool.execute(
      "SELECT id, parent_id, is_visible FROM categories",
    );

    const childrenByParent = new Map();
    categoryRows.forEach((category) => {
      const parentKey =
        category.parent_id === null ? "root" : String(category.parent_id);
      const current = childrenByParent.get(parentKey) || [];
      current.push(category);
      childrenByParent.set(parentKey, current);
    });

    const queue = [Number(categoryId)];
    const allowedCategoryIds = [];
    const visited = new Set();

    while (queue.length > 0) {
      const currentId = queue.shift();
      if (visited.has(currentId)) continue;
      visited.add(currentId);

      const currentCategory = categoryRows.find(
        (category) => Number(category.id) === Number(currentId),
      );

      if (!currentCategory || Number(currentCategory.is_visible) !== 1) {
        continue;
      }

      allowedCategoryIds.push(currentId);

      const children = childrenByParent.get(String(currentId)) || [];
      children.forEach((child) => queue.push(Number(child.id)));
    }

    if (allowedCategoryIds.length === 0) {
      return [];
    }

    const placeholders = allowedCategoryIds.map(() => "?").join(", ");

    const query = `
      SELECT
        p.*,
        p.base_price AS price,
        c.name AS category_name,
        (
          SELECT pvi.image_url
          FROM product_variants pv
          LEFT JOIN product_variant_images pvi ON pvi.variant_id = pv.id
          WHERE pv.product_id = p.id
          ORDER BY pvi.is_primary DESC, pvi.display_order ASC, pvi.id ASC
          LIMIT 1
        ) AS image_url
      FROM products p
      LEFT JOIN categories c ON c.id = p.category_id
      WHERE p.is_active = 1
        AND p.category_id IN (${placeholders})
      ORDER BY p.id DESC
    `;

    const [rows] = await db.pool.execute(query, allowedCategoryIds);
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
  listWeb,
  createModal,
  updateModal,
  deleteModal,
};
