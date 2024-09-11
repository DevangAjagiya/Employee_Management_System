import React, { useState, useEffect } from "react";
import EmployeeSearch from "./EmployeeSearch";
import EmployeeTable from "./EmployeeTable";
import { useNavigate } from "react-router-dom";

const EmployeeDirectory = () => {
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All");

  const employeeTypes = ["All", "FullTime", "PartTime", "Contract", "Seasonal"];
    const navigate = useNavigate();
  
    const handleCreateClick = () => {
      navigate("/create");
    };
  function fetchData() {
    try {
      const response = fetch("http://localhost:9000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            query {
              employeeList {
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
        .then((res) => res.json())
        .then((data) => {
          setTableData(data.data.employeeList);
          setFilteredData(data.data.employeeList);
        });
    } catch (error) {
      console.error("Error fetching employee data:", error.message);
    }
  }

  async function handleDelete(id) {
    try {
      const employee = tableData.find((employee) => employee.id === id);
      if (employee.currentStatus) {
        alert("CAN'T DELETE EMPLOYEE - STATUS ACTIVE");
        return;
      }
  
      const response = await fetch("http://localhost:9000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            mutation {
              deleteEmployee(id: ${id})
            }
          `,
        }),
      });
  
      const data = await response.json();
  
      if (data.data.deleteEmployee) {
        setTableData(tableData.filter((employee) => employee.id !== id));
        setFilteredData(filteredData.filter((employee) => employee.id !== id));
        alert("Employee deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting employee:", error.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedFilter === "All") {
      setFilteredData(tableData);
    } else {
      setFilteredData(
        tableData.filter((employee) => employee.employeeType === selectedFilter)
      );
    }
  }, [selectedFilter, tableData]);

  return (
    <div>
      <EmployeeSearch
        employeeTypes={employeeTypes}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
      <div className="container">
        <EmployeeTable tableData={filteredData} handleDelete={handleDelete} />
      </div>
      <br />
      <div className="container text-center">
        <button className="btn btn-primary" onClick={handleCreateClick}>Create New Employee</button>
      </div>
    </div>
  );
};

export default EmployeeDirectory;
