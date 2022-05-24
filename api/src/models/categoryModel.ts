import mongoose from "mongoose";

export interface ICategory extends mongoose.Document {
  name: string;
  description: string;
  picture: string;
  gender: string;
}

const categorySchema = new mongoose.Schema<ICategory>({
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

export default mongoose.model<ICategory>("Category", categorySchema);
