import mongoose from "mongoose";

const CompareSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  compareList: [
    { type: mongoose.Schema.Types.ObjectId, ref: "products", required: true },
  ],
});

const CompareModel = mongoose.model("compare-lists", CompareSchema);

export default CompareModel;
