const { Contact } = require("./schemas/contact");

const getAllContacts = async () => {
  return Contact.find();
};

const getContactById = (id) => {
  return Contact.findOne({ _id: id });
};

const createContact = (body) => {
  return Contact.create(body);
};

const updateContact = (id, body) => {
  return Contact.findByIdAndUpdate({ _id: id }, body, { new: true });
};

const updateFieldFavorite = (id, body) => {
  return Contact.findByIdAndUpdate(id, body, { new: true });
};

const removeContact = (id) => {
  return Contact.findByIdAndRemove({ _id: id });
};

const service = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
  updateFieldFavorite,
};

module.exports = service;
