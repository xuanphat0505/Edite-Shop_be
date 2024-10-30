import mongoose from "mongoose";

export const CitiesSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  cities: [
    {
      type: String,
    },
  ],
});

export const CitiesModel = mongoose.model("cities", CitiesSchema);

export default CitiesModel;
