import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function EmployeeSearch({ employeeTypes, selectedFilter, setSelectedFilter }) {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedFilter) {
      params.set('filter', selectedFilter);
    } else {
      params.delete('filter');
    }
    navigate({ search: params.toString() });
  }, [selectedFilter, navigate]);

  return (
    <div className="search-container container mt-3">
      <select
        className="form-select"
        value={selectedFilter}
        onChange={(e) => setSelectedFilter(e.target.value)}
      >
        {employeeTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
}

export default EmployeeSearch;