module.exports = (app, callback) => {
  const CONFIG = require("../config/config");
  //Connect to DB
  const mongoose = require("mongoose");
  let settings = {
    /*reconnectTries: Number.MAX_VALUE, (no longer necessary in newer versions) https://mongoosejs.com/docs/migrating_to_6.html#removed-reconnecttries-and-reconnectinterval-options
        autoReconnect: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false*/
  };
  global.mongoConnection = mongoose.createConnection(
    CONFIG.mongodb.uri,
    settings,
    (error) => {
      if (error) throw error;
      console.log("---Connected to DB");
      return callback();
    }
  );
};
