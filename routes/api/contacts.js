const express = require("express");
const router = express.Router();

const ctrlTask = require("../../controllers/contacts");
const { schemas } = require("../../service/schemas/contact");
const { validation } = require("../../middlewares");
const { ctrlWrapper } = require("../../helpers");

router.get("/", ctrlTask.getAll);

router.get("/:id", ctrlWrapper(ctrlTask.getById));

router.post("/", validation(schemas.addSchema), ctrlWrapper(ctrlTask.create));

router.put("/:id", validation(schemas.addSchema), ctrlWrapper(ctrlTask.update));

router.delete("/:id", ctrlWrapper(ctrlTask.remove));

router.patch(
  "/:id/favorite",
  validation(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrlTask.updateFavorite)
);

module.exports = router;
