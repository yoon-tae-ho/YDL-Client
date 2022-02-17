import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Browse from "./routes/Browse";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/browse" element={<Browse />} />
        <Route path="/browse/my-list" element={<Browse />} />
      </Routes>
    </Router>
  );
};

export default App;
