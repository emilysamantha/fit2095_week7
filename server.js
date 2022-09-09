const PORT_NUMBER = 8080;

const express = require("express");
const mongoose = require("mongoose");

const senders = require("./routers/sender");
const parcels = require("./routers/parcel");

const app = express();

// Listening to port
app.listen(PORT_NUMBER, () => {
  console.log("Listening on http://localhost: " + PORT_NUMBER);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect("mongodb://localhost:27017/movies", function (err) {
  if (err) {
    return console.log("Mongoose - connection error:", err);
  }
  console.log("Connected Successfully");
});

// Configuring endpoints
// Sender RESTFul Endpoints
app.get("/sender/:name", senders.getAllParcelsByName);
app.post("/sender", senders.createNewSender);
app.delete("/sender", senders.deleteSenderByID);
app.put("/sender", senders.updateNameByID);
app.put("/sender/parcel", senders.addNewParcel);

// Parcel RESTFul Endpoints
app.get("/parcel", parcels.getParcelsByAddress);
app.put("/parcel", parcels.updateAddressByID);
app.put("/parcel/weight", parcels.updateWeightbyID);
