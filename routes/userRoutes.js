const express = require("express");
const router = express.Router();
const {
  getUsers,
  getProfile,
  updateProfile,
  getUser,
  updateRoleUser,
  deleteUser,
} = require("../controllers/userControllers");
const verifyJWT = require("../middleware/verifyJWT");
const verifyAdminJWT = require("../middleware/verifyAdminJWT");

router.use(verifyJWT);
router.get("/profile", getProfile);
router.put("/update-profile", updateProfile);

router.use(verifyAdminJWT);
router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/update-role/:id", updateRoleUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;
