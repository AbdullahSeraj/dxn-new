const Order = require("../models/Order");

const getAllOrders = async (req, res) => {
  const orders = await Order.find();
  if (orders.length == 0 || !orders) {
    return res.status(400).json({ message: "Not found any order" });
  }

  res.json(orders);
};

const getOrdersByUserId = async (req, res) => {
  const userId = req.user;

  try {
    const orders = await Order.find({ userId });

    if (!orders) {
      return res
        .status(400)
        .json({ message: "Not found this order for this user" });
    }

    res.json(orders);
  } catch (error) {
    return res.status(402).json({ message: "server error" });
  }
};

const createOrder = async (req, res) => {
  const userId = req.user;

  const { products } = req.body;

  if (!products || !userId) {
    return res.status(400).json({ message: "some fields are required" });
  }

  const order = await Order.create({
    userId,
    products,
  });

  if (!order) {
    return res.status(401).json({ message: "error when add order" });
  }

  res.json(order);
};

module.exports = {
  getAllOrders,
  getOrdersByUserId,
  createOrder,
};
