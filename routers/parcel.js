const mongoose = require("mongoose");

const Sender = require("../models/sender");
const Parcel = require("../models/parcel");

module.exports = {
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
      { address: req.body.address },
      function (err, parcel) {
        if (err) return res.status(400).json(err);
        if (!parcel) return res.status(404).json();
        res.json(parcel);
      }
    );
  },

  // Extra task
  updateWeightbyID: function (req, res) {
    let currWeight = 0;
    Parcel.findOne({ _id: req.body.id }, function (err, parcel) {
      if (err) return res.status(400).json(err);
      if (!parcel) return res.status(404).json();
      currWeight = parcel.weight;
      Parcel.findOneAndUpdate(
        { _id: req.body.id },
        { weight: currWeight + 10 },
        function (err, parcel) {
          if (err) return res.status(400).json(err);
          if (!parcel) return res.status(404).json();
          res.json(parcel);
        }
      );
    });
  },
};
