  import React from "react";
  import "./App.css";
  import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
  import Navbar from "./Components/Navbar";
  import EmployeeDirectory from "./Components/EmployeeDirectory";
  import EmployeeCreate from "./Components/EmployeeCreate";
  import EmployeeEdit from "./Components/EmployeeEdit";
  import EmployeeDetails from "./Components/EmployeeDetails";
  import EmployeeRetiring from "./Components/EmployeeRetiring";
  function App() {
    return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<EmployeeDirectory />} />
          <Route path="/create" element={<EmployeeCreate />} />
          <Route path="/edit/:id" element={<EmployeeEdit />} />
          <Route path="/details/:id" element={<EmployeeDetails />} />
          <Route path="/retiring" element={<EmployeeRetiring />} />
        </Routes>
      </Router>
    );
  }

  export default App;
