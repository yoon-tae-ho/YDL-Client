import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../components/Input";
import { login } from "../controllers/userController";
import userContext from "../contexts/UserContext";

const Login = () => {
  const { setLoggedIn, setUser } = useContext(userContext);
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  const onSubmit = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    emailRef.current.value = "";
    const password = passwordRef.current.value;
    passwordRef.current.value = "";

    const { status, user } = await login({ email, password });

    if (status === 404) {
      // Bad email
    } else if (status === 400) {
      // Bad password
    }

    // login
    setLoggedIn(true);
    setUser(user);
    console.log(user);

    // redirect
    navigate("/");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <Input
          reference={emailRef}
          type="email"
          placeholder="Email"
          required={true}
          name="email"
        />
        <Input
          reference={passwordRef}
          type="password"
          placeholder="Password"
          required={true}
          name="password"
        />
        <Input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
