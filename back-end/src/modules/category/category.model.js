const db = require("../../../db/config");

const list = async () => {
  try {
    const [rows] = await db.pool.execute("SELECT name FROM categories");
    return rows;
  } catch (error) {
    console.log("Error fetching categories:", error);
    // next(error);
  }
};

module.exports = {
  list,
};
