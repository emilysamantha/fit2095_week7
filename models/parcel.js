const mongoose = require("mongoose");

let parcelSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sender",
  },
  address: {
    type: String,
    vaidate: {
      type: String,
      validate: {
        validator: function (addressValue) {
          return addressValue.length >= 3;
        },
        message: "Address must be at least 3 characters.",
      },
    },
    required: true,
  },
  weight: {
    type: Number,
    validate: {
      validator: function (weightValue) {
        return weightValue >= 0;
      },
      message: "Weight must be a positive number.",
    },
    required: true,
  },
  fragile: Boolean,
});

module.exports = mongoose.model("Parcel", parcelSchema);
