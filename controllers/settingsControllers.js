const Settings = require("../models/Settings");

const getSettings = async (req, res) => {
  try {
    const settings = await Settings.find();
    if (!settings) {
      return res.status(400).json({ message: "not data in settings" });
    }

    res.json(settings);
  } catch (error) {
    return res.status(404).json({ message: "server error" });
  }
};

const updateSettings = async (req, res) => {
  const { shuffle } = req.body;

  try {
    const settings = await Settings.updateMany({ shuffle });
    if (!settings) {
      return res.status(400).json({ message: "not data in settings" });
    }

    res.json(settings);
  } catch (error) {
    return res.status(404).json({ message: "server error" });
  }
};

module.exports = { getSettings, updateSettings };
