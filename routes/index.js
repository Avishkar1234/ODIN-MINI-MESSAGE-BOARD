const express = require("express");
const router = express.Router();
const {
  getAllMessages,
  insertMessage,
  getMessageById,
} = require("../db/queries");

// Show all messages (homepage)
router.get("/", async (req, res) => {
  try {
    const messages = await getAllMessages();
    res.render("index", { title: "Mini Message Board", messages });
  } catch (err) {
    console.error(err);
    res.send("Error fetching messages");
  }
});

// Show form to create a new message
router.get("/new", (req, res) => {
  res.render("form", { title: "New Message" });
});

// Handle new message submission
router.post("/new", async (req, res) => {
  const { messageText, messageUser } = req.body;

  if (!messageText || !messageUser) {
    return res.send("Both fields are required!");
  }

  try {
    await insertMessage(messageText, messageUser);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.send("Error inserting message");
  }
});

// Show single message by ID
router.get("/message/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const message = await getMessageById(id);
    if (!message) return res.send("Message not found");
    res.render("message", { title: `Message #${id}`, message });
  } catch (err) {
    console.error(err);
    res.send("Error fetching message");
  }
});

module.exports = router;
