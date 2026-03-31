const { list } = require("./category.model");
const getList = async (req, res, next) => {
  try {
    const result = await list();
    res.json({
      success: true,
      data: result,
      message: "Categories retrieved successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getList,
};
