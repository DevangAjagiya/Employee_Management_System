const mongoose = require("mongoose");
require("dotenv").config();
const connectionString = process.env.DATABASE;
// function for connecting the database
async function connectDB() {
  await mongoose.connect(connectionString);
  console.log("database is connected!");
}

module.exports = { connectDB };
