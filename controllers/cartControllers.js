const Cart = require("../models/Cart");
const User = require("../models/User");

const getCart = async (req, res) => {
  const userId = req.user;
  try {
    if (!userId) {
      return res.status(400).json({ message: "user id not found" });
    }

    const cart = await Cart.find({ userId });
    if (!cart) {
      return res.status(401).json({ message: "cart is empty" });
    }

    res.json(cart);
  } catch (error) {
    return res.status(404).json({ message: "server error" });
  }
};

const addCart = async (req, res) => {
  const userId = req.user;
  const { quantity, color, size, productId } = req.body;

  try {
    if (!quantity) {
      return res.status(400).json({ message: "add quantity for product" });
    }

    if (!productId) {
      return res.status(401).json({ message: "product id not found" });
    }

    if (!userId) {
      return res.status(402).json({ message: "user id not found" });
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(403).json({ message: "user not found" });
    }

    const cartFound = await Cart.findOne({ productId, color, userId });

    if (cartFound) {
      const updateQuantity = await Cart.findOneAndUpdate(
        { productId, color, userId },
        {
          quantity: Number(cartFound.quantity) + Number(quantity),
        }
      );

      res.json(updateQuantity);
    } else {
      const cart = await Cart.create({
        productId,
        userId,
        quantity,
        color,
        size,
      });

      if (!cart) {
        res.status(405).json({ message: "error when add to cart" });
      }

      res.json(cart);
    }
  } catch (error) {
    res.status(404).json({ message: "server error" });
  }
};

const deleteCart = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ message: "cart id is required input" });
    }

    const foundCart = await Cart.findById(id);
    if (!foundCart) {
      return res.status(401).json({ message: "cart not found" });
    }

    const deleteCart = await Cart.findByIdAndDelete(id);
    if (!deleteCart) {
      return res.status(402).json({ message: "error when delete" });
    }

    res.json(deleteCart);
  } catch (error) {
    res.status(404).json({ message: "server error" });
  }
};

const clearCart = async (req, res) => {
  const userId = req.user;
  try {
    if (!userId) {
      return res.status(400).json({ message: "user id not found" });
    }

    const cart = await Cart.deleteMany({ userId });
    if (!cart) {
      return res
        .status(401)
        .json({ message: "Not found any product for delete" });
    }

    res.json(cart);
  } catch (error) {
    res.status(404).json({ message: "server error" });
  }
};

const updateQuantityCart = async (req, res) => {
  const { quantity, plusOne, minusOne } = req.body;
  const { id } = req.params;

  try {
    const cart = await Cart.findById(id);
    if (!cart) {
      return res.status(400).json({ message: "cart not found" });
    }

    if (quantity) {
      const cart = await Cart.findByIdAndUpdate(id, { quantity: quantity });
      res.json(cart);
    } else if (plusOne) {
      const cartFound = await Cart.findById(id);
      const cart = await Cart.findByIdAndUpdate(id, {
        quantity: cartFound.quantity + 1,
      });
      res.json(cart);
    } else if (minusOne) {
      const cartFound = await Cart.findById(id);

      if (cartFound.quantity > 1) {
        const cart = await Cart.findByIdAndUpdate(id, {
          quantity: cartFound.quantity - 1,
        });
        res.json(cart);
      } else {
        const cart = await Cart.findByIdAndDelete(id);
        res.json(cart);
      }
    }
  } catch (error) {
    res.status(404).json({ message: "server error" });
  }
};

module.exports = {
  getCart,
  addCart,
  deleteCart,
  clearCart,
  updateQuantityCart,
};
