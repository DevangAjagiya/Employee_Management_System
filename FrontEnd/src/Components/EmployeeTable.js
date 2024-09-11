import React from "react";
import { Link } from "react-router-dom";

function EmployeeTable({ tableData, handleDelete, componentName }) {
  return (
    <table className="table table-striped table-bordered employee-table">
  <thead className="thead-dark">
    <tr>
      <th>Id</th>
      <th>Firstname</th>
      <th>Lastname</th>
      <th>Age</th>
      <th>Date of Joining</th>
      <th>Title</th>
      <th>Department</th>
      <th>Employee Type</th>
      <th>Current Status</th>
      {componentName !== "EmployeeRetiring" && <th>Actions</th>}
    </tr>
  </thead>
  <tbody>
    {tableData.map(
      (
        {
          id,
          firstname,
          lastname,
          age,
          dateOfJoining,
          title,
          department,
          employeeType,
          currentStatus,
        },
        index
      ) => (
        <tr key={index}>
          <td>{id}</td>
          <td>{firstname}</td>
          <td>{lastname}</td>
          <td>{age}</td>
          <td>{new Date(dateOfJoining).toLocaleDateString()}</td>
          <td>{title}</td>
          <td>{department}</td>
          <td>{employeeType}</td>
          <td>{currentStatus ? "Working" : "Retired"}</td>
          {componentName !== "EmployeeRetiring" && (
            <td className="action-buttons">
            <Link to={`/edit/${id}`} className="action-link">
              <button className="btn btn-primary btn-sm" style={{ marginRight: '10px' }}>Edit</button>
            </Link>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDelete(id)}
              style={{ marginRight: '10px' }} 
            >
              Delete
            </button>
            <Link to={`/details/${id}`} className="action-link">
              <button className="btn btn-success btn-sm">Info</button>
            </Link>
          </td>
          )}
          
        </tr>
      )
    )}
  </tbody>
</table>

  );
}

export default EmployeeTable;
