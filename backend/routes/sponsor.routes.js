const express = require("express");
let router = express.Router();
const SponsorController = require("../controllers/sponsor.controller");
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
    SponsorController.create
  )
  .get(AuthController.checkAuth, SponsorController.get);

router
  .route("/:id")
  .get(
    AuthController.checkAuth,
    [param("id").isMongoId()],
    SponsorController.getOne
  )
  .put(
    AuthController.checkAuth,
    [param("id").isMongoId()],
    SponsorController.update
  )
  .delete(
    AuthController.checkAuth,
    [param("id").isMongoId()],
    SponsorController.delete
  );

module.exports = router;
