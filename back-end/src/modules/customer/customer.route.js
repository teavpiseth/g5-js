const express = require("express");
const router = express.Router();
const { getList, create, update, deleteCustomer } = require("./customer.ctrl");
const authMiddleware = require("../../middleware/authMiddleware");

router.use(authMiddleware);
router.get("/", getList);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", deleteCustomer);

module.exports = router;
