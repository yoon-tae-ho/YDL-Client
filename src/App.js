import React, { useEffect, useMemo, useState } from "react";
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
import Instructor from "./routes/Instructor";
import Login from "./routes/Login";
import Logout from "./routes/Logout";

import UserContext from "./contexts/UserContext";
import { checkUser } from "./controllers/userController";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    checkUser().then((result) => {
      if (result) {
        setLoggedIn(result.loggedIn);
        setUser(result.user);
      }
    });
  }, []);

  const value = useMemo(
    () => ({
      loggedIn,
      setLoggedIn,
      user,
      setUser,
    }),
    [loggedIn, setLoggedIn, user, setUser]
  );

  return (
    <UserContext.Provider value={value}>
      <Router>
        <Routes>
          {/* /browse */}
          <Route path="/" element={<Navigate to="/browse" />} />
          <Route path="/browse">
            <Route path="" element={<Browse />} />
            <Route path=":id" element={<Lecture />} />
            <Route path="topics/:id" element={<Topic />} />
            <Route path="instructors/:id" element={<Instructor />} />
          </Route>
          {/* /watch */}
          <Route path="/watch" element={<Watch />} />
          {/* user */}
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
