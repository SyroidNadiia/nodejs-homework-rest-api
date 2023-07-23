const express = require("express");

const router = express.Router();

const { ctrlWrapper } = require("../../helpers");
const ctrl = require("../../controllers/users");
const { authenticate, validation, upload } = require("../../middlewares");
const { schemas } = require("../../models/user");

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

router.patch(
  "/:id",
  authenticate,
  validation(schemas.subscriptionSchema),
  ctrlWrapper(ctrl.updateSubscription)
);

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verify));

router.post(
  "/verify",
  validation(schemas.verifyEmailSchema),
  ctrlWrapper(ctrl.resendEmail)
);

module.exports = router;
