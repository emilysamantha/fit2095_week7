const mongoose = require("mongoose");

let senderSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  name: {
    type: String,
    validate: {
      validator: function (nameValue) {
        return nameValue.length >= 3;
      },
      message: "Name should have at least 3 characters.",
    },
    required: true,
  },
  parcels: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Parcel",
    },
  ],
});

module.exports = mongoose.model("Sender", senderSchema);
