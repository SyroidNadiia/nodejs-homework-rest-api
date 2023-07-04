const express = require("express");

const router = express.Router();

const { ctrlWrapper } = require("../../helpers");
const ctrl = require("../../controllers/auth");

const { validation } = require("../../middlewares");
const { schemas } = require("../../models/user");

router.post(
  "/register",
  validation(schemas.registerSchema),
  ctrlWrapper(ctrl.register)
);

module.exports = router;
