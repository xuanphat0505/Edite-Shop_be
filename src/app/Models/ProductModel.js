import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: false,
  },
  newPrice: {
    type: String,
    required: true,
  },
  sale: {
    type: Number,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  optionColor: [
    {
      code: {
        type: String,
        required: true,
      },
      colorName: {
        type: String,
        required: true,
      },
      optionImageId: {
        type: Number,
        required: true,
      },
    },
  ],
  category: [
    {
      categoryType: {
        type: String,
        required: true,
      },
    },
  ],
  image: {
    type: String,
    required: true,
  },
  subImage: [
    {
      id: {
        type: Number,
        required: true,
      },
      src: {
        type: String,
        required: true,
      },
      colorImage: {
        type: String,
      },
    },
  ],
  date: {
    type: String,
    required: true,
  },
});

const ProductModel = mongoose.model("products", ProductSchema);

export default ProductModel;
