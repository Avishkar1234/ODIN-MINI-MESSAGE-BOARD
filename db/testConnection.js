const pool = require("./pool");

async function testDB() {
  const res = await pool.query("SELECT NOW()");
  console.log("Database connected at:", res.rows[0].now);
  process.exit();
}

testDB();
