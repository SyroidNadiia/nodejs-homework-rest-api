const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/contacts");
const { schemas } = require("../../models/contact");
const { validation } = require("../../middlewares");
const { ctrlWrapper } = require("../../helpers");

router.get("/", ctrl.getAll);

router.get("/:id", ctrlWrapper(ctrl.getById));

router.post("/", validation(schemas.addSchema), ctrlWrapper(ctrl.create));

router.put("/:id", validation(schemas.addSchema), ctrlWrapper(ctrl.update));

router.delete("/:id", ctrlWrapper(ctrl.remove));

router.patch(
  "/:id/favorite",
  validation(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
