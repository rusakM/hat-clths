const mongoose = require("mongoose");

const categoryRankSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  rank: Number,
});

module.exports = mongoose.model("CategoryRank", categoryRankSchema);
