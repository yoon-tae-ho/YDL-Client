import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../components/Input";
import UserContext from "../contexts/UserContext";
import { join } from "../controllers/userController";

const Join = () => {
  const { setLoggedIn, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const password2Ref = useRef();

  const onSubmit = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    emailRef.current.value = "";
    const username = usernameRef.current.value;
    usernameRef.current.value = "";
    const password = passwordRef.current.value;
    passwordRef.current.value = "";
    const password2 = password2Ref.current.value;
    password2Ref.current.value = "";

    if (password !== password2) {
      // password error
    }

    const { status, data } = await join({
      email,
      username,
      password,
      password2,
    });

    if (status === 201) {
      // login
      setLoggedIn(true);
      setUser(data);

      // redirect
      navigate("/");
    }

    if (data === "badPassword") {
      // password does not match
    } else if (data === "badEmail") {
      // email already exists
    }
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
          reference={usernameRef}
          type="text"
          placeholder="Username"
          required={true}
          name="username"
        />
        <Input
          reference={passwordRef}
          type="password"
          placeholder="Password"
          required={true}
          name="password"
        />
        <Input
          reference={password2Ref}
          type="password"
          placeholder="Password Confirmation"
          required={true}
          name="password2"
        />
        <Input type="submit" value="Join" />
      </form>
    </div>
  );
};

export default Join;
