import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import UserContext from "../contexts/UserContext";
import { logout } from "../controllers/userController";
import { useAnalyticsEventTracker } from "../hooks";

const Logout = () => {
  const { setLoggedIn, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Google Analytics
  const gaEventTracker = useAnalyticsEventTracker("Logout");

  useEffect(() => {
    logout().then((status) => {
      if (status === 200) {
        setLoggedIn(false);
        setUser({});
        gaEventTracker("", "");

        // move to home "/"
        const link = document.createElement("a");
        link.href = window.location.origin + "/";
        link.click();
      } else if (status === 401) {
        navigate("/login", { replace: true });
      }
    });
  }, []);
  return <div></div>;
};

export default Logout;
