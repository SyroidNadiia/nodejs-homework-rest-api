const express = require("express");

const router = express.Router();

const { ctrlWrapper } = require("../../helpers");
const ctrl = require("../../controllers/users");
const { authenticate } = require("../../middlewares");

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.patch("/", authenticate, ctrlWrapper(ctrl.renewalSubscription));

module.exports = router;
