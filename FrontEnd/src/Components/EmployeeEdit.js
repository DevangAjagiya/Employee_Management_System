import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EmployeeEdit() {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    title: "",
    department: "",
    currentStatus: "",
  });
  const navigate = useNavigate();
  const url = "http://localhost:9000/graphql";

  useEffect(() => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query {
            getEmployee(id: ${id}) {
              id
              title
              department
              currentStatus
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.errors) {
          console.error(result.errors[0].message);
        } else {
          setEmployee(result.data.getEmployee);
        }
      })
      .catch((error) =>
        console.error("Error fetching employee details:", error)
      );
  }, [id, url]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          mutation {
            updateEmployee(
              id: ${id},
              title: "${employee.title}",
              department: "${employee.department}",
              currentStatus: ${employee.currentStatus}
            ) {
              id
              title
              department
              currentStatus
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.errors) {
          console.error(result.errors[0].message);
        } else {
          alert("Employee updated successfully");
          navigate("/");
        }
      })
      .catch((error) => console.error("Error updating employee:", error));
  };

 return (
  <div className="employee-edit container">
  <h2 className="details-heading">Edit Employee</h2>
  <div className="details-content">
    <div className="mb-3">
      <label className="form-label">
        Title:
        <select
          name="title"
          value={employee.title}
          onChange={handleChange}
          className="form-select"
        >
          <option value="Employee">Employee</option>
          <option value="Manager">Manager</option>
          <option value="Director">Director</option>
          <option value="VP">VP</option>
        </select>
      </label>
    </div>
    <div className="mb-3">
      <label className="form-label">
        Department:
        <select
          name="department"
          value={employee.department}
          onChange={handleChange}
          className="form-select"
        >
          <option value="IT">IT</option>
          <option value="Marketing">Marketing</option>
          <option value="HR">HR</option>
          <option value="Engineering">Engineering</option>
        </select>
      </label>
    </div>
    <div className="mb-3">
      <label className="form-label">
        Current Status:
        <select
          name="currentStatus"
          value={employee.currentStatus}
          onChange={handleChange}
          className="form-select"
        >
          <option value="1">Working</option>
          <option value="0">Retired</option>
        </select>
      </label>
    </div>
  </div>
  <div className="action-buttons">
    <button className="btn btn-primary" onClick={handleSubmit}>Save</button>
    <button className="btn btn-secondary" onClick={() => navigate("/")}>Cancel</button>
  </div>
</div>

);
}

export default EmployeeEdit;
