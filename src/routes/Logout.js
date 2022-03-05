import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { logout } from "../controllers/userController";

const Logout = () => {
  const { setLoggedIn, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    logout().then((status) => {
      if (status === 200) {
        setLoggedIn(false);
        setUser({});
        navigate("/");
      }
    });
  }, []);
  return <div></div>;
};

export default Logout;
