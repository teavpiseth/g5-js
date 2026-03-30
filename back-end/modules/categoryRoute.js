const express = require("express");
const router = express.Router();
const { pool } = require("../db/config");

// GET /api/categories - Get all categories
router.get("/", async (req, res) => {
  try {
    const query = `
      SELECT 
        id,
        name,
        slug,
        description,
        parent_id,
        image_url,
        is_visible,
        sort_order,
        created_at,
        updated_at
      FROM categories 
      WHERE is_visible = true 
      ORDER BY sort_order ASC, name ASC
    `;

    const [rows] = await pool.execute(query); // promise

    res.status(200).json({
      success: true,
      data: rows,
      count: rows.length,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// GET /api/categories/top-level - Get only top-level categories (parent_id is NULL)
router.get("/top-level", async (req, res) => {
  try {
    const query = `
      SELECT 
        id,
        name,
        slug,
        description,
        parent_id,
        image_url,
        is_visible,
        sort_order,
        created_at,
        updated_at
      FROM categories 
      WHERE is_visible = true AND parent_id IS NULL
      ORDER BY sort_order ASC, name ASC
    `;

    const [rows] = await pool.execute(query);

    res.status(200).json({
      success: true,
      data: rows,
      count: rows.length,
    });
  } catch (error) {
    console.error("Error fetching top-level categories:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// GET /api/categories/:id - Get category by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // if (!id || isNaN(id)) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Invalid category ID",
    //   });
    // }

    const query =
      `
      SELECT 
        id,
        name,
        slug,
        description,
        parent_id,
        image_url,
        is_visible,
        sort_order,
        created_at,
        updated_at
      FROM categories 
      WHERE id =
    ` + id;

    const [rows] = await pool.execute(query, [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      data: rows[0],
    });
  } catch (error) {
    console.error("Error fetching category by ID:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// GET /api/categories/:id/children - Get child categories of a parent category
router.get("/:id/children", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid parent category ID",
      });
    }

    const query = `
      SELECT 
        id,
        name,
        slug,
        description,
        parent_id,
        image_url,
        is_visible,
        sort_order,
        created_at,
        updated_at
      FROM categories 
      WHERE parent_id = ? AND is_visible = true
      ORDER BY sort_order ASC, name ASC
    `;

    const [rows] = await pool.execute(query, [id]);

    res.status(200).json({
      success: true,
      data: rows,
      count: rows.length,
      parent_id: parseInt(id),
    });
  } catch (error) {
    console.error("Error fetching child categories:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// GET /api/categories/tree - Get categories in hierarchical tree structure
router.get("/tree/all", async (req, res) => {
  try {
    // Get all categories
    const query = `
      SELECT 
        id,
        name,
        slug,
        description,
        parent_id,
        image_url,
        is_visible,
        sort_order,
        created_at,
        updated_at
      FROM categories 
      WHERE is_visible = true
      ORDER BY sort_order ASC, name ASC
    `;

    const [rows] = await pool.execute(query);

    // Build hierarchical structure
    const categoryMap = new Map();
    const rootCategories = [];

    // First pass: create category objects
    rows.forEach((category) => {
      categoryMap.set(category.id, { ...category, children: [] });
    });

    // Second pass: build tree structure
    rows.forEach((category) => {
      if (category.parent_id === null) {
        rootCategories.push(categoryMap.get(category.id));
      } else {
        const parent = categoryMap.get(category.parent_id);
        if (parent) {
          parent.children.push(categoryMap.get(category.id));
        }
      }
    });

    res.status(200).json({
      success: true,
      data: rootCategories,
      count: rootCategories.length,
      total_categories: rows.length,
    });
  } catch (error) {
    console.error("Error fetching category tree:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// PUT /api/categories/:id - Update category by ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      slug,
      description,
      parent_id,
      image_url,
      is_visible,
      sort_order,
    } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID",
      });
    }

    if (!name) {
      return res.status(400).json({
        success: false,
        message: " Name is required fields",
      });
    }

    // Check if category exists
    const checkQuery = `SELECT id FROM categories WHERE id = ?`;
    const [existingCategory] = await pool.execute(checkQuery, [id]);

    if (existingCategory.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Update category
    const updateQuery = `
      UPDATE categories 
      SET 
        name = ?,
        slug = ?,
        description = ?,
        parent_id = ?,
        image_url = ?,
        is_visible = ?,
        sort_order = ?,
      WHERE id = ?
    `;

    const [result] = await pool.execute(updateQuery, [
      name,
      slug,
      description || null,
      parent_id || null,
      image_url || null,
      is_visible !== undefined ? is_visible : true,
      sort_order || 0,
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Category not found or no changes made",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
    });
  } catch (error) {
    console.error("Error updating category:", error);

    // Handle duplicate entry error
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "Category with this slug already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// DELETE /api/categories/:id - Delete category by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID",
      });
    }

    // Check if category exists
    const checkQuery = `SELECT id, name FROM categories WHERE id = ?`;
    const [existingCategory] = await pool.execute(checkQuery, [id]);

    if (existingCategory.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Check if category has child categories
    const childrenQuery = `SELECT COUNT(*) as childCount FROM categories WHERE parent_id = ?`;
    const [childrenResult] = await pool.execute(childrenQuery, [id]);

    if (childrenResult[0].childCount > 0) {
      return res.status(400).json({
        success: false,
        message:
          "Cannot delete category that has child categories. Please delete or reassign child categories first.",
      });
    }

    // Check if category is being used by products (if you have a products table)
    // Uncomment this section if you have a products table with category_id
    /*
    const productsQuery = `SELECT COUNT(*) as productCount FROM products WHERE category_id = ?`;
    const [productsResult] = await pool.execute(productsQuery, [id]);

    if (productsResult[0].productCount > 0) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete category that has associated products. Please reassign products first.",
      });
    }
    */

    // Delete the category
    const deleteQuery = `DELETE FROM categories WHERE id = ?`;
    const [result] = await pool.execute(deleteQuery, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: `Category '${existingCategory[0].name}' deleted successfully`,
      deletedId: parseInt(id),
    });
  } catch (error) {
    console.error("Error deleting category:", error);

    // Handle foreign key constraint errors
    if (error.code === "ER_ROW_IS_REFERENCED_2") {
      return res.status(400).json({
        success: false,
        message:
          "Cannot delete category because it is referenced by other records",
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// insert or create, read, update, delete
// crud

module.exports = router;
