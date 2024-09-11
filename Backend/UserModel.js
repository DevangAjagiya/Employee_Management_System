const mongoose = require("mongoose");

//The user schema model using Mongoose
const userSchema = new mongoose.Schema({
  id: Number,
  firstname: String,
  lastname: String,
  age: Number,
  dateOfJoining: String,
  title: String,
  department: String,
  employeeType: String,
  currentStatus: Number,
});

// Create the employee model
const Employee = mongoose.model("Employee", userSchema);

// The counters schema model using Mongoose
const counterSchema = new mongoose.Schema({
  _id: String,
  current: Number,
});

const Counter = mongoose.model("Counter", counterSchema);

module.exports = { Employee, Counter };
