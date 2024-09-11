import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const EmployeeCreate = () => {
  const [formFields, setFormFields] = useState({
    Firstname: "",
    Lastname: "",
    Age: "",
    DateofJoining: "",
    Title: "Employee",
    Department: "IT",
    EmployeeType: "FullTime",
    CurrentStatus: 1,
  });

  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  }

  function submitHandler(e) {
    e.preventDefault();
    createEmployee(formFields);
  }

  function createEmployee(employeeDetails) {
    try {
      const response = fetch("http://localhost:9000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            mutation {
              insertEmployee(
                firstname: "${employeeDetails.Firstname}",
                lastname: "${employeeDetails.Lastname}",
                age: ${employeeDetails.Age},
                dateOfJoining: "${employeeDetails.DateofJoining}",
                title: "${employeeDetails.Title}",
                department: "${employeeDetails.Department}",
                employeeType: "${employeeDetails.EmployeeType}",
                currentStatus: ${employeeDetails.CurrentStatus}
              ) {
                id
                firstname
                lastname
                age
                dateOfJoining
                title
                department
                employeeType
                currentStatus
              }
            }
          `,
        }),
      });

      response
        .then((res) => {
          if (!res.ok) {
            return res.json().then((data) => {
              throw new Error(data.errors[0].message);
            });
          }
          return res.json();
        })
        .then((data) => {
          const newEmployee = data.data.insertEmployee;
          console.log("New employee created:", newEmployee);
          alert("Employee Added Successfully!");
          navigate("/"); // Navigate back to the main directory page
        });
    } catch (error) {
      console.error("Error creating employee:", error.message);
    }
  }

  return (
    <div className="container mt-4">
  <div className="card p-4">
    <form id="employeeForm" onSubmit={submitHandler} className="form">
      <h3 className="mb-4">New Employee</h3>
      <div className="mb-3">
        <label htmlFor="firstname" className="form-label">
          Firstname
        </label>
        <input
          type="text"
          id="firstname"
          name="Firstname"
          value={formFields.Firstname}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="lastname" className="form-label">
          Lastname
        </label>
        <input
          type="text"
          id="lastname"
          name="Lastname"
          value={formFields.Lastname}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <div className="mb-3">
  <label htmlFor="age" className="form-label">
    Age
  </label>
  <input
    type="number"
    id="age"
    name="Age"
    value={formFields.Age}
    onChange={handleChange}
    required
    className="form-control"
    min="18"
  />
</div>
      <div className="mb-3">
        <label htmlFor="dateofjoining" className="form-label">
          Date of Joining
        </label>
        <input
          type="date"
          id="dateofjoining"
          name="DateofJoining"
          value={formFields.DateofJoining}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <select
          id="title"
          name="Title"
          value={formFields.Title}
          onChange={handleChange}
          required
          className="form-select"
        >
          <option value="Employee">Employee</option>
          <option value="Manager">Manager</option>
          <option value="Director">Director</option>
          <option value="VP">VP</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="department" className="form-label">
          Department
        </label>
        <select
          id="department"
          name="Department"
          value={formFields.Department}
          onChange={handleChange}
          required
          className="form-select"
        >
          <option value="IT">IT</option>
          <option value="Marketing">Marketing</option>
          <option value="HR">HR</option>
          <option value="Engineering">Engineering</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="employeetype" className="form-label">
          Employee Type
        </label>
        <select
          id="employeetype"
          name="EmployeeType"
          value={formFields.EmployeeType}
          onChange={handleChange}
          required
          className="form-select"
        >
          <option value="FullTime">FullTime</option>
          <option value="PartTime">PartTime</option>
          <option value="Contract">Contract</option>
          <option value="Seasonal">Seasonal</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="currentstatus" className="form-label">
          Current Status
        </label>
        <select
          id="currentstatus"
          name="CurrentStatus"
          value={formFields.CurrentStatus}
          onChange={handleChange}
          disabled
          className="form-select"
        >
          <option value={1}>Working</option>
          <option value={0}>0</option>
        </select>
      </div>
      
      <div className="container text-center">
      <input type="submit" value="Submit" className="btn btn-primary" style={{ marginRight: '10px' }} />
      <Link to="/" style={{ textDecoration: "none" }}>
        <button className="btn btn-secondary">Back To Home</button>
      </Link>
      </div>
    </form>
  </div>
  <div className="table-container mt-4">{}</div>
</div>
  );
};

export default EmployeeCreate;
