const express = require("express");
const Joi = require("joi");
const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const emailRegexp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const contactSchema = Joi.object({
  name: Joi.string().min(2).trim().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const oneContact = await getContactById(contactId);

  if (oneContact) {
    res.status(200).json(oneContact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.post("/", async (req, res, next) => {
  const { error, value } = contactSchema.validate(req.body);

  if (error) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    const newContact = await addContact(value);
    res.status(201).json(newContact);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const deletedContact = await removeContact(contactId);

  if (deletedContact) {
    res.status(200).json({ message: "contact deleted" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const { error, value } = contactSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: "missing fields" });
  }

  const updatedContact = await updateContact(contactId, value);

  if (updatedContact) {
    res.status(200).json(updatedContact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

module.exports = router;
