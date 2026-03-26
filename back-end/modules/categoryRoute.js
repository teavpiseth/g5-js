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

    const [rows] = await pool.execute(query);

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

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID",
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
      WHERE id = ? AND is_visible = true
    `;

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

module.exports = router;
