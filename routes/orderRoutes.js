const express = require("express");
const router = express.Router();
const {
  getAllOrders,
  getOrdersByUserId,
  createOrder,
} = require("../controllers/orderControllers");
const verifyJWT = require("../middleware/verifyJWT");
const verifyAdminJWT = require("../middleware/verifyAdminJWT");

router.use(verifyJWT);
router.get("/by-user-id", getOrdersByUserId);
router.post("/", createOrder);

router.use(verifyAdminJWT);
router.get("/", getAllOrders);

module.exports = router;
