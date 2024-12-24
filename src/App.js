import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import "./App.css";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard/:id" element={<Dashboard />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
      </Routes>
    </Router>
  );
};

export default App;
