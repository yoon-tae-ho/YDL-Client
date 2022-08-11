import React, { useEffect, useMemo, useState } from "react";
import UserContext from "./contexts/UserContext";
import SearchContext from "./contexts/SearchContext";
import { checkUser } from "./controllers/userController";
import Router from "./Router";

const App = () => {
  // UserContext
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  // SearchContext
  const [isSearching, setIsSearching] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    checkUser().then((result) => {
      const { loggedIn, user } = result;
      if (loggedIn) {
        setUser(user);
        setLoggedIn(loggedIn);
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
      stopSearching: () => {
        if (isSearching) {
          setIsSearching(false);
          setText("");
        }
      },
    }),
    [isSearching, setIsSearching, text, setText]
  );

  return (
    <UserContext.Provider value={userValue}>
      <SearchContext.Provider value={searchValue}>
        <Router />
      </SearchContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
