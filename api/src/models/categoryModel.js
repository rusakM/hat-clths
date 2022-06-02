const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Nie podano nazwy kategorii"],
  },
  description: String,
  picture: String,
  gender: {
    type: String,
    enum: ["kobieta", "mężczyzna"],
  },
});

export default mongoose.model("Category", categorySchema);
