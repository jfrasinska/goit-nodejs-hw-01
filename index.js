const contactsModule = require("./contacts");

async function testContactFunctions() {
  try {
    const allContacts = await contactsModule.listContacts();
    console.log("All Contacts:", allContacts);

    const contactById = await contactsModule.getContactById(1);
    console.log("Contact by ID:", contactById);

    const contactToRemoveId = 1;
    const isRemoved = await contactsModule.removeContact(contactToRemoveId);
    console.log(`Contact with ID ${contactToRemoveId} removed:`, isRemoved);

    const newContact = await contactsModule.addContact(
      "John Doe",
      "john@example.com",
      "123-456-7890"
    );
    console.log("New Contact Added:", newContact);

    const updatedContacts = await contactsModule.listContacts();
    console.log("Updated Contacts:", updatedContacts);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

testContactFunctions();
