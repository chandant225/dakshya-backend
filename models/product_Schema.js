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
    summary: {
      type: String,
    },
    description: {
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

productSchema.index({
  name: "text",
  category: "text",
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;
