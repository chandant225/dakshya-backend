const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    mark_price: {
      type: Number,
    },
    discount: {
      type: Number,
    },
    short_description: {
      type: String,
    },
    long_description: {
      type: String,
    },
    images: [Object],

    is_collection: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("product", productSchema);

module.exports = Product;
