const db = require("../../../db/config");

const list = async () => {
  try {
    const [rows] = await db.pool.execute("SELECT * FROM categories");
    return rows;
  } catch (error) {
    console.log("Error fetching categories:", error);
    // next(error);
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
    const deleteQuery = "DELETE FROM categories WHERE id = ?";
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
  updateModal,
  deleteModal,
};
