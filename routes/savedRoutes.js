const express = require("express");
const router = express.Router();
const verifyJWT = require("../middleware/verifyJWT");
const {
  getSaved,
  addToSaved,
  removeSaved,
  isSaved,
} = require("../controllers/savedControllers");

router.use(verifyJWT);

router.route("/").get(getSaved);
router.route("/add").post(addToSaved);
router.route("/delete/:id").delete(removeSaved);
router.route("/is-saved/:id").get(isSaved);

module.exports = router;
