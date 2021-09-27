const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    cityShipping: {
      type: String,
      required: true,
    },
    cityBilling: {
      type: String,
      required: true,
    },
    addressBilling: {
      type: String,
      required: true,
    },
    addressShipping: {
        type: String,
        required: true
    },
    stateShipping: {
        type: String,
        required: true
    },
    stateBilling: {
        type: String,
        required: true
    },
    nameBilling: {
        type: String,
        required: true
    },
    nameShipping: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
  },

  {
    timestamps: true,
  }
);

const OrderSchema = mongoose.model("orders", orderSchema);
module.exports = OrderSchema;
