const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
    throw new Error("Error reading contacts file");
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const result = contacts.find((item) => item.id === contactId);
    return result || null;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting contact by id");
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((item) => item.id === contactId);
    if (index === -1) {
      return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Error removing contact");
  }
};

const addContact = async (value) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      ...value,
    };

    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.log(error);
    throw new Error("Error adding contact");
  }
};

const updateContact = async (contactId, value) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((item) => item.id === contactId);
    if (index !== -1) {
      const updatedContact = {
        ...contacts[index],
        ...value,
      };
      contacts[index] = updatedContact;
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      return updatedContact;
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error updating contact");
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
