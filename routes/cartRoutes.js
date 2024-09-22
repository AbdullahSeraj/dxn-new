const express = require("express");
const router = express.Router();
const {
  getCart,
  addCart,
  deleteCart,
  clearCart,
  updateQuantityCart,
} = require("../controllers/cartControllers");
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT);

router.get("/", getCart);
router.post("/add", addCart);
router.delete("/delete/:id", deleteCart);
router.delete("/clear", clearCart);
router.put("/update/:id", updateQuantityCart);

module.exports = router;
