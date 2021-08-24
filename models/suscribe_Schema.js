const mongoose = require("mongoose");

const SuscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Suscriber = mongoose.model("suscriber", SuscriberSchema);
module.exports = Suscriber;
