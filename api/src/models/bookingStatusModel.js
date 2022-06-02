const mongoose = require("mongoose");

const bookingStatusSchema = new mongoose.Schema(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: [true, "Nie podano numeru zamówienia"],
    },
    createdAt: {
      type: Date,
    },
    description: {
      type: String,
      required: [true, "Nie podano opisu do statusu"],
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

bookingStatusSchema.index({ booking: -1, createdAt: -1 });

bookingStatusSchema.pre("save", function (next) {
  if (this.isNew) {
    this.createdAt = new Date(Date.now());
  }

  next();
});

module.exports = mongoose.model("BookingStatus", bookingStatusSchema);
