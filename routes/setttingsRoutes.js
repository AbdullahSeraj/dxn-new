const express = require("express");
const router = express.Router();
const verifyAdminJWT = require("../middleware/verifyAdminJWT");
const {
  getSettings,
  updateSettings,
} = require("../controllers/settingsControllers");

router.route("/").get(getSettings);

router.use(verifyAdminJWT);
router.route("/update").put(updateSettings);

module.exports = router;
