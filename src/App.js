import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReactGA from "react-ga";

import UserContext from "./contexts/UserContext";
import SearchContext from "./contexts/SearchContext";
import { checkUser } from "./controllers/userController";
import Router from "./Router";
import Header from "./components/Header";
import RouteChangeTracker from "./RouteChangeTracker";

// Google Analytics
const isProduction = !window.location.href.includes("localhost");
ReactGA.initialize(isProduction ? process.env.REACT_APP_GA_TRACKING_ID : null);

const App = () => {
  // UserContext
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  // SearchContext
  const [isSearching, setIsSearching] = useState(false);
  const [text, setText] = useState("");

  // track route change for Google Analytics
  // RouteChangeTracker();

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
    <>
      <UserContext.Provider value={userValue}>
        <SearchContext.Provider value={searchValue}>
          <BrowserRouter>
            <RouteChangeTracker />
            <Header />
            <Router />
          </BrowserRouter>
        </SearchContext.Provider>
      </UserContext.Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};

export default App;
