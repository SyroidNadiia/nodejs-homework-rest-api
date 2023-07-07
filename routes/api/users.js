const express = require("express");

const router = express.Router();

const { ctrlWrapper } = require("../../helpers");
const ctrl = require("../../controllers/users");
const { authenticate, validation } = require("../../middlewares");
const { schemas } = require("../../models/user");

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.patch(
  "/:id",
  authenticate,
  validation(schemas.subscriptionSchema),
  ctrlWrapper(ctrl.updateSubscription)
);

module.exports = router;
