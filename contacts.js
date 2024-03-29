const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");

    if (!data.trim()) {
      console.log("Contacts file is empty.");
      return [];
    }

    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    throw error;
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((c) => c.id === contactId);
    return contact;
  } catch (error) {
    throw error;
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();

    const contactToRemove = contacts.find((c) => c.id === contactId);
    if (!contactToRemove) {
      console.log(`Contact with ID ${contactId} not found.`);
      return false;
    }

    const updatedContacts = contacts.filter((c) => c.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));

    return true;
  } catch (error) {
    throw error;
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = { id: contacts.length + 1, name, email, phone };
    const updatedContacts = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    return newContact;
  } catch (error) {
    throw error;
  }
}

async function invokeAction({ action, id, name, email, phone }) {
  try {
    switch (action) {
      case "list":
        const allContacts = await listContacts();
        console.table(allContacts);
        return allContacts;

      case "get":
        const contactById = await getContactById(id);
        console.log("Contact by ID:", contactById);
        return contactById;

      case "add":
        const newContact = await addContact(name, email, phone);
        console.log("New Contact Added:", newContact);
        return newContact;

      case "remove":
        const isRemoved = await removeContact(id);
        console.log(`Contact with ID ${id} removed:`, isRemoved);
        return isRemoved;

      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  invokeAction,
};
