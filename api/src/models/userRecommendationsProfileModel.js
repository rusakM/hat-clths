const mongoose = require("mongoose");

const UserRecommendationsProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  score: Number,
  gender: Boolean,
  createdAt: Date,
});

UserRecommendationsProfileSchema.index({ user: 1 });

UserRecommendationsProfileSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "_id name email role",
    options: { _recursed: true },
  });
  next();
});

module.exports = mongoose.model(
  "UserRecommendationsProfile",
  UserRecommendationsProfileSchema
);
