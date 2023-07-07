const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/contacts");
const { schemas } = require("../../models/contact");
const { validation, authenticate, isValidId } = require("../../middlewares");
const { ctrlWrapper } = require("../../helpers");

router.get("/", authenticate, ctrl.getAll);

router.get("/:id", authenticate, isValidId, ctrlWrapper(ctrl.getById));

router.post(
  "/",
  authenticate,
  validation(schemas.addSchema),
  ctrlWrapper(ctrl.create)
);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validation(schemas.addSchema),
  ctrlWrapper(ctrl.update)
);

router.delete("/:id", authenticate, isValidId, ctrlWrapper(ctrl.remove));

router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validation(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
