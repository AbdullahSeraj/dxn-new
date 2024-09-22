const express = require("express");
const router = express.Router();
const {
  signup,
  signin,
  signout,
  signinWithGoogle,
} = require("../controllers/authControllers");

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signout);
router.post("/signin-with-google", signinWithGoogle);

module.exports = router;
