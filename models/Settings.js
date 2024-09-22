const mongoose = require("mongoose");

const SettingsSchema = new mongoose.Schema(
  {
    shuffle: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Settings", SettingsSchema);
