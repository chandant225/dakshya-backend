const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    is_active: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);


const Coupon = mongoose.model("coupon", couponSchema);

module.exports = Coupon;
