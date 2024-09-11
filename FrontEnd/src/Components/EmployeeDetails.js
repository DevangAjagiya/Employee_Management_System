import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EmployeeDetails() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
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

  if (!employee) return <div>Loading...</div>;

  return (
    <div className="card employee-details mt-5">
      <div className="card-header">
        <h2 className="card-title">Employee Details</h2>
      </div>
      <div className="card-body">
        <p className="card-text fw-bold">First Name: {employee.firstname}</p>
        <p className="card-text fw-bold">Last Name: {employee.lastname}</p>
        <p className="card-text fw-bold">Age: {employee.age}</p>
        <p className="card-text fw-bold">Date Of Joining: {new Date(employee.dateOfJoining).toLocaleDateString()}</p>
        <p className="card-text fw-bold">Title: {employee.title}</p>
        <p className="card-text fw-bold">Department: {employee.department}</p>
        <p className="card-text fw-bold">Employee Type: {employee.employeeType}</p>
        <p className="card-text fw-bold">Current Status: {employee.currentStatus === 1 ? "Working" : "Retired"}</p>
        <p className="card-text fw-bold">Years Left for Retirement: {calculateYearsLeft(employee.dateOfJoining, employee.age)}</p>
      </div>
      <div className="card-footer">
        <button className="btn btn-primary" onClick={() => navigate("/")}>Back</button>
      </div>
    </div>
  );

  function calculateYearsLeft(dateOfJoining, age) {
    const retirementDate = new Date(dateOfJoining);
    retirementDate.setFullYear(retirementDate.getFullYear() + 60 - age);
    const currentDate = new Date();
    let yearsLeft = retirementDate.getFullYear() - currentDate.getFullYear();
    let monthsLeft = retirementDate.getMonth() - currentDate.getMonth();
    let daysLeft = retirementDate.getDate() - currentDate.getDate();

    if (daysLeft < 0) {
      monthsLeft--;
      const daysInPreviousMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        0
      ).getDate();
      daysLeft += daysInPreviousMonth;
    }

    if (monthsLeft < 0) {
      yearsLeft--;
      monthsLeft += 12;
    }

    if (yearsLeft < 0) {
      yearsLeft = 0;
    }

    return `${daysLeft} days, ${monthsLeft} months, ${yearsLeft} years`;
  }
}

export default EmployeeDetails;
