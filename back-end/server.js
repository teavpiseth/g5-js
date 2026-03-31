const express = require("express");
const app = express();
const cors = require("cors");
const todoRoute = require("./modules/todoRoute");
// const categoryRoute = require("./modules/categoryRoute");
const categoryRoute = require("./modules/category/category.route");

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors());

app.use("/todos", todoRoute);
app.use("/api/categories", categoryRoute);

// Handle 404 for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const PORT = 3033;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
