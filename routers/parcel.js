const mongoose = require("mongoose");

const Sender = require("../models/sender");
const Parcel = require("../models/parcel");

module.exports = {
  // Task 2. Add Parcel to Sender
  addNewParcel: function (req, res) {
    let newParcelDetails = req.body.parcel;
    newParcelDetails._id = new mongoose.Types.ObjectId();
    console.log(newParcelDetails);

    let parcel = new Parcel(newParcelDetails);
    parcel.save(function (err) {
      console.log("Done");
    });

    Sender.findOne({ _id: req.body.id }, function (err, sender) {
      if (err) return res.status(400).json(err);
      if (!sender) return res.status(404).json();

      sender.parcels.push(newParcelDetails._id);
      sender.save(function (err) {
        if (err) return res.status(500).json(err);
        res.json(sender);
      });
    });
  },

  // Task 3.1. Get all parcels by address
  getParcelsByAddress: function (req, res) {
    Parcel.find({ address: req.query.address }, function (err, parcels) {
      if (err) return res.status(400).json(err);
      res.json(parcels);
    });
  },

  // Task 3.2. Update parcel address by ID
  updateAddressByID: function (req, res) {
    Parcel.findOneAndUpdate(
      { _id: req.body.id },
      req.body.address,
      function (err, parcel) {
        if (err) return res.status(400).json(err);
        if (!parcel) return res.status(404).json();
        res.json(parcel);
      }
    );
  },
};
