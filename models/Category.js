const { default: mongoose } = require("mongoose");
const mangoose = require("mongoose");

const categorySchema = mangoose.Schema({
  title: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Category", categorySchema);
