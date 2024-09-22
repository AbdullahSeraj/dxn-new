const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productControllers");
const verifyAdminJWT = require("../middleware/verifyAdminJWT");

router.get("/", getProducts);
router.get("/:id", getProduct);

router.use(verifyAdminJWT);
router.post("/create", createProduct);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);

module.exports = router;
