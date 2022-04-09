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
import Search from "./routes/Search";

import UserContext from "./contexts/UserContext";
import SearchContext from "./contexts/SearchContext";
import { checkUser } from "./controllers/userController";

const App = () => {
  // UserContext
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  // SearchContext
  const [isSearching, setIsSearching] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    checkUser().then((result) => {
      if (result) {
        setUser(result.user);
        setLoggedIn(result.loggedIn);
      }
    });
  }, []);

  const userValue = useMemo(
    () => ({
      loggedIn,
      setLoggedIn,
      user,
      setUser,
    }),
    [loggedIn, setLoggedIn, user, setUser]
  );

  const searchValue = useMemo(
    () => ({
      isSearching,
      setIsSearching,
      text,
      setText,
    }),
    [isSearching, setIsSearching, text, setText]
  );

  return (
    <UserContext.Provider value={userValue}>
      <SearchContext.Provider value={searchValue}>
        <Router>
          <Routes>
            {/* /search */}
            <Route path="/search" element={<Search />} />
            {/* /browse */}
            <Route path="/" element={<Navigate replace to="/browse" />} />
            <Route path="/browse">
              <Route path="" element={<Browse />} />
              <Route path=":id" element={<Lecture />} />
              <Route path="topics/:id" element={<Topic />} />
              <Route path="instructors/:id" element={<Instructor />} />
            </Route>
            {/* /watch */}
            <Route path="/watch/:id" element={<Watch />} />
            {/* user */}
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </Router>
      </SearchContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
