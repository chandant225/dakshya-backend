const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    picture: {
      type: String,
    },
    email: {
      type: String,
    },
    facebook_id: {
      type: String,
    },
    google_id: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
