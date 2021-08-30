const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    order_id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    ref_id: {
      type: String,
      required: true,
    },
    payment_method: {
      type: String,
      required: true,
    },
    payment: {
      type: {},
      required: true,
    },
    cart: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model("payment", paymentSchema);

module.exports = Payment;
