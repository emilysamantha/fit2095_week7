const mongoose = require("mongoose");

const Sender = require("../models/sender");
const Parcel = require("../models/parcel");

module.exports = {
  // Task 1.1. Get all parcels from a sender
  getAllParcelsByName: function (req, res) {
    Sender.findOne({ name: req.params.name })
      .populate("parcels")
      .exec(function (err, sender) {
        if (err) return res.status(400).json(err);
        if (!sender) return res.status(404).json();
        res.json(sender);
      });
  },

  // Task 1.2. Create a new sender
  createNewSender: function (req, res) {
    let newSenderDetails = req.body;
    newSenderDetails._id = new mongoose.Types.ObjectId();

    let sender = new Sender(newSenderDetails);
    sender.save(function (err) {
      res.json(sender);
    });
  },

  // Task 1.3. Delete a sender by ID
  deleteSenderByID: function (req, res) {
    Sender.findOneAndRemove({ _id: req.body.id }, function (err) {
      if (err) return res.status(400).json(err);
      res.json();
    });
  },

  // Task 1.4. Update sender's name by ID
  updateNameByID: function (req, res) {
    Sender.findOneAndUpdate(
      { _id: req.body.id },
      req.body.update,
      function (err, sender) {
        if (err) return res.status(400).json(err);
        if (!sender) return res.status(404).json();
        res.json(sender);
      }
    );
  },
};
