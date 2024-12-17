const express = require("express");
let router = express.Router();
const ExpertController = require("../controllers/expert.controller");
const { body, param, sanitizeBody } = require("express-validator");
const CONFIG = require("../config/config");
const AuthController = require("../controllers/auth.controller");

router
  .route("/")
  .post(
    [
      body("name").isString(),
      body("location.city").isString(),
      sanitizeBody("name").whitelist(CONFIG.sanitize.alphabet),
      sanitizeBody("location.city").whitelist(
        CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical
      ),
    ],
    ExpertController.create
  )
  .get(AuthController.checkAuth, ExpertController.get);

router
  .route("/:id")
  .get(
    AuthController.checkAuth,
    [param("id").isMongoId()],
    ExpertController.getOne
  )
  .put(
    AuthController.checkAuth,
    [param("id").isMongoId()],
    ExpertController.update
  )
  .delete(
    AuthController.checkAuth,
    [param("id").isMongoId()],
    ExpertController.delete
  );

module.exports = router;
