const fs = require("node:fs/promises");
const crypto = require("node:crypto");
const path = require("node:path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function readFile() {
  const contacts = await fs.readFile(contactsPath, { encoding: "UTF-8" });
  return JSON.parse(contacts);
}

function writeFile(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
}

async function listContacts() {
  const contacts = await readFile();
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await readFile();
  const contact = contacts.find((contact) => contact.id === contactId);

  if (contact === undefined) {
    return null;
  }

  return contact;
}

async function removeContact(contactId) {
  const contacts = await readFile();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  const newContacts = [
    ...contacts.slice(0, index),
    ...contacts.slice(index + 1),
  ];

  await writeFile(newContacts);
  return contacts[index];
}

async function addContact(name, email, phone) {
  const contacts = await readFile();
  const newContact = {
    id: crypto.randomUUID(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  await writeFile(contacts);
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
