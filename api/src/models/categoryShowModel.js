const mongoose = require("mongoose");

const categoryShowSchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

categoryShowSchema.index({ category: 1, createdAt: -1 });

categoryShowSchema.pre("save", function (next) {
  if (this.isNew) {
    this.createdAt = new Date(Date.now());
  }
  next();
});

module.exports = mongoose.model("CategoryShow", categoryShowSchema);
