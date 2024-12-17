const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CONFIG = require("../config/config");

const sponsorSchema = new Schema({
  name: String,
  location: {
    city: String,
  },
  auth: {
    username: {
      type: String,
      unique: true,
    },
    public_key: String,
    private_key: String,
  },
  animals: [String],
});

sponsorSchema.pre("save", function (callback) {
  this.auth.public_key = Math.random().toString(36).substring(2) + this._id;
  this.auth.private_key = Math.random().toString(36).substring(2) + this._id;
  callback();
});

module.exports = global.mongoConnection.model(
  CONFIG.mongodb.collections.sponsor,
  sponsorSchema
);
