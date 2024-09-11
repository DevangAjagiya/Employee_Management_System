import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import EmployeeTable from "./EmployeeTable";
import EmployeeSearch from "./EmployeeSearch";

export default function EmployeeRetiring() {
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const employeeTypes = ["All", "FullTime", "PartTime", "Contract", "Seasonal"];
  const navigate = useNavigate();

  useEffect(() => {
    let tempData = [];

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
          tempData = data.data.employeeList;

          let data1 = tempData.filter((employee) => {
            const yearsToRetirement = employee.age + 1;
            if (yearsToRetirement >= 65) {
              return employee;
            }
          });

          setTableData(data1);
          filterData(data1, selectedFilter);
        });
    } catch (error) {
      console.error("Error fetching employee data:", error.message);
    }
  }, []);

  useEffect(() => {
    filterData(tableData, selectedFilter);
    const params = new URLSearchParams();
    if (selectedFilter) {
      params.set('filter', selectedFilter);
    } else {
      params.delete('filter');
    }
    navigate({ search: params.toString() });
  }, [selectedFilter, tableData, navigate]);

  const filterData = (data, filter) => {
    if (filter === "All") {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter(employee => employee.employeeType === filter));
    }
  };

  const handleDelete = (id) => {
    const updatedData = tableData.filter(employee => employee.id !== id);
    setTableData(updatedData);
    setFilteredData(updatedData);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Employees Retiring Soon</h1>
      
      <EmployeeSearch
        employeeTypes={employeeTypes}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />

      <EmployeeTable
        tableData={filteredData}
        setFilteredData={setFilteredData}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        employeeTypes={employeeTypes}
        handleDelete={handleDelete}
        className="table table-striped"
        componentName="EmployeeRetiring"
      />
      <div className="container text-center">
        <Link to="/" style={{ textDecoration: "none" }}>
          <button className="btn btn-secondary mt-3">Back To Home</button>
        </Link>
      </div>
    </div>
  );
}