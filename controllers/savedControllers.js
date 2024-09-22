const Saved = require("../models/Saved");

const getSaved = async (req, res) => {
  const userId = req.user;

  try {
    if (!userId) {
      return res.status(400).json({ message: "first sign in" });
    }

    const saved = await Saved.find({ userId });
    if (!saved) {
      return res
        .status(401)
        .json({ message: "not found any favorite product" });
    }

    res.json(saved);
  } catch (error) {
    return res.status(404).json({ message: "server error" });
  }
};

const addToSaved = async (req, res) => {
  const userId = req.user;
  const { productId } = req.body;

  try {
    if (!userId) {
      return res.status(400).json({ message: "first sign in" });
    }

    const savedFound = await Saved.findOne({ productId, userId });
    if (savedFound) {
      return res
        .status(401)
        .json({ message: "you already saved this product" });
    }

    const saved = await Saved.create({
      userId,
      productId,
    });

    if (!saved) {
      return res.status(402).json({ message: "error when adding" });
    }

    res.json(saved);
  } catch (error) {
    return res.status(404).json({ message: "first sign in" });
  }
};

const removeSaved = async (req, res) => {
  const userId = req.user;
  const { id } = req.params;

  try {
    if (!userId) {
      return res.status(400).json({ message: "server error" });
    }

    const savedFound = await Saved.findOne({ productId: id, userId });
    if (!savedFound) {
      return res
        .status(401)
        .json({ message: "you already removed this product from favorites" });
    }

    const saved = await Saved.findOneAndDelete({ productId: id, userId });

    if (!saved) {
      return res.status(402).json({ message: "error when deleting" });
    }

    res.json(saved);
  } catch (error) {
    return res.status(404).json({ message: "server error" });
  }
};

const isSaved = async (req, res) => {
  const userId = req.user;
  const { id } = req.params;

  try {
    if (!userId) {
      return res.status(400).json({ message: "first sign in" });
    }

    if (!id) {
      return res.status(401).json({ message: "not found product id" });
    }

    const saved = await Saved.findOne({ productId: id, userId });

    if (saved) {
      res.json({ isSaved: true });
    } else {
      res.json({ isSaved: false });
    }
  } catch (error) {
    return res.status(404).json({ message: "first sign in" });
  }
};

module.exports = { getSaved, addToSaved, removeSaved, isSaved };
