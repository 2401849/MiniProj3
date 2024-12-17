const port = process.env.PORT || 8080;
const host = process.env.HOST || "0.0.0.0";
const express = require("express");
const generator = require("express-oas-generator");
const app = express();
generator.handleResponses(app, {});

app.use("/assets", express.static("assets"));
app.use("/views", express.static("views"));

require("./init/db.js")(app, () => {
  require("./init/middleware")(app);
  require("./init/router")(app);
  generator.handleRequests();
  app.listen(port, host, (error) => {
    if (error) throw error;
    console.log(
      "Your app is listening on " + port + "\nApi Documentation at /api-doc"
    );
  });
});
