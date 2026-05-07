const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const todoRoute = require("./src/modules/todoRoute");
// const categoryRoute = require("./modules/categoryRoute");
const categoryRoute = require("./src/modules/category/category.route");
const productRoute = require("./src/modules/product/product.route");
const productVariantRoute = require("./src/modules/product_variant/product_variant.route");
const userRoute = require("./src/modules/user/user.route");
const customerRoute = require("./src/modules/customer/customer.route");
const authRoute = require("./src/modules/auth/auth.route");
const upload = require("./src/middleware/uploadFile");

// Middleware to parse JSON request bodies
app.use(express.json());
// app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/todos", todoRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/products", productRoute);
app.use("/api/products/:product_id/variants", productVariantRoute);
app.use("/api/users", userRoute);
app.use("/api/customers", customerRoute);
app.use("/api/auth", authRoute);

// Handle 404 for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const PORT = 3034;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
