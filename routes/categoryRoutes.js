const express = require("express");
const router = express.Router();
const {
  getCategories,
  addCategory,
  removeCategory,
  getCategory,
} = require("../controllers/categoryControllers");
const verifyAdminJWT = require("../middleware/verifyAdminJWT");

router.get("/", getCategories);
router.get("/:id", getCategory);

router.use(verifyAdminJWT);
router.post("/add", addCategory);
router.delete("/delete/:id", removeCategory);

module.exports = router;
