const db = require("./queries");

async function test() {
  await db.insertMessage("Testing from Node!", "Avishkar");
  const messages = await db.getAllMessages();
  console.log(messages);
  process.exit();
}

test();
