const pool = require("./pool");

async function getAllMessages() {
  const { rows } = await pool.query(
    "SELECT * FROM messages ORDER BY added DESC",
  );

  return rows;
}

async function getMessageById(id) {
  const { rows } = await pool.query("SELECT * FROM messages WHERE id=$1", [id]);
  return rows[0];
}

async function insertMessage(text, user_name) {
  await pool.query("INSERT INTO messages (text, user_name) VALUES ($1, $2)", [
    text,
    user_name,
  ]);
}

module.exports = { getAllMessages, getMessageById, insertMessage };
