import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Browse from "./routes/Browse";
import Watch from "./routes/Watch";
import Lecture from "./routes/Lecture";
import Topic from "./routes/Topic";

//https://kyounghwan01.github.io/blog/React/cant-perform-a-React-state-update-on-an-unmounted-component/#%E1%84%87%E1%85%A1%E1%86%AF%E1%84%89%E1%85%A2%E1%86%BC-%E1%84%8B%E1%85%B5%E1%84%8B%E1%85%B2

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/browse" />} />
        {/* /browse */}
        <Route path="/browse">
          <Route path="" element={<Browse />} />
          <Route path=":id" element={<Lecture />} />
          <Route path="topics/:id" element={<Topic />} />
        </Route>
        {/* /watch */}
        <Route path="/watch" element={<Watch />} />
      </Routes>
    </Router>
  );
};

export default App;
