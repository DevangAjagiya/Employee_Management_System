const { get } = require("mongoose");
const { Employee, Counter } = require("./UserModel");

// Function to get list of employees
async function employeeList() {
  const employees = await Employee.find({});
  // console.log(employees);
  return employees;
}

// Function to get details of a single employee by ID
async function getEmployee(_, { id }) {
  const employee = await Employee.findOne({ id });
  return employee;
}

// Function to insert a new employee into the database
async function insertEmployee(
  _,
  {
    firstname,
    lastname,
    age,
    dateOfJoining,
    title,
    department,
    employeeType,
    currentStatus,
  }
) {
  // Initializing the counter if not present
  let counter = await Counter.findById("employee");
  if (!counter) {
    counter = await new Counter({ _id: "employee", current: 0 }).save();
  }

  // Incrementing counter to add new id
  counter = await Counter.findByIdAndUpdate(
    "employee",
    { $inc: { current: 1 } },
    { new: true }
  );
  const newId = counter.current;

  const newEmployee = new Employee({
    id: newId,
    firstname,
    lastname,
    age,
    dateOfJoining,
    title,
    department,
    employeeType,
    currentStatus,
  });

  // Saving employee to database
  const insertResult = await newEmployee.save();
  // console.log("insertResult", insertResult);
  return newEmployee;
}

// Function to update selected fields of an employee
async function updateEmployee(_, { id, title, department, currentStatus }) {
  const updatedEmployee = await Employee.findOneAndUpdate(
    { id },
    { title, department, currentStatus },
    { new: true }
  );
  return updatedEmployee;
}

// Function to delete an employee by ID
async function deleteEmployee(_, { id }) {
  const deleteResult = await Employee.findOneAndDelete({ id });
  return deleteResult !== null;
}

// Resolvers for Apollo Server
const resolvers = {
  Query: {
    employeeList,
    getEmployee,
  },
  Mutation: {
    insertEmployee,
    updateEmployee,
    deleteEmployee,
  },
};

module.exports = resolvers;
