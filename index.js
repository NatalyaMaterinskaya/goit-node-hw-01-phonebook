const { program } = require("commander");

const contactMethods = require("./contacts");

async function selectAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await contactMethods.listContacts();
      return console.table(contacts, ["name", "email", "phone"]);
    case "get":
      const contact = await contactMethods.getContactById(id);
      return console.log(contact);
    case "remove":
      const removedComtact = await contactMethods.removeContact(id);
      return console.log(removedComtact);
    case "add":
      const createdContact = await contactMethods.addContact(
        name,
        email,
        phone
      );
      return console.log(createdContact);
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

program
  .option("-a, --action <action>", "Action to select")
  .option("-i, --id <id>", "Contact id")
  .option("-n, --name <name>", "Contact name")
  .option("-e, --email <email>", "Contact email")
  .option("-p, --phone <phone>", "Contact phone");

program.parse(process.argv);

const options = program.opts();

selectAction(options);