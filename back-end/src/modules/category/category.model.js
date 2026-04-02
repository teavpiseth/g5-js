const db = require("../../../db/config");

const list = async () => {
  try {
    const [rows] = await db.pool.execute(
      "SELECT * FROM categories ORDER BY  desc",
    );
    console.log("Categories fetched successfully:", rows);
    return rows;
  } catch (error) {
    throw error;
    // console.log("Error fetching categories:", error);
    // // next(error);
  }
};

const createModal = async (req, res, next) => {
  try {
    const { name, description, parent_id, image_url, is_visible, sort_order } =
      req.body;

    const query =
      "INSERT INTO categories (name, description, parent_id, image_url, is_visible, sort_order, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())";
    const values = [
      name,
      description || null,
      parent_id || null,
      image_url || null,
      is_visible !== undefined ? is_visible : 1,
      sort_order !== undefined ? sort_order : 0,
    ];

    const [result] = await db.pool.execute(query, values);

    return {
      ...result,
    };
  } catch (error) {
    console.log("Error creating category:", error);
    throw error;
  }
};

const updateModal = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, parent_id, image_url, is_visible, sort_order } =
      req.body;

    const query =
      "UPDATE categories SET name = ?, description = ?, parent_id = ?, image_url = ?, is_visible = ?, sort_order = ? WHERE id = ?";
    const values = [
      name,
      description,
      parent_id,
      image_url,
      is_visible,
      sort_order,
      id,
    ];

    const [result] = await db.pool.execute(query, values);
    return result;
  } catch (error) {
    console.log("Error updating category:", error);
  }
};

const deleteModal = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if category exists
    const checkQuery = "SELECT id, name FROM categories WHERE id = ?";
    const [existingCategory] = await db.pool.execute(checkQuery, [id]);

    if (existingCategory.length === 0) {
      return { notFound: true };
    }

    // Check if category has child categories
    const childrenQuery =
      "SELECT COUNT(*) as childCount FROM categories WHERE parent_id = ?";
    const [childrenResult] = await db.pool.execute(childrenQuery, [id]);

    if (childrenResult[0].childCount > 0) {
      return { hasChildren: true };
    }

    // Delete the category
    const deleteQuery = "update categories set is_visible = 0 where id = ?";
    const [result] = await db.pool.execute(deleteQuery, [id]);

    return {
      ...result,
      categoryName: existingCategory[0].name,
      deletedId: id,
    };
  } catch (error) {
    console.log("Error deleting category:", error);
    throw error;
  }
};

module.exports = {
  list,
  createModal,
  updateModal,
  deleteModal,
};
