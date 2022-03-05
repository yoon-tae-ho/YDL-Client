import React from "react";
import Header from "../components/Header";

const Login = () => {
  return (
    <div style={{ marginTop: "100px" }}>
      <Header />
      <a href={`${process.env.REACT_APP_API_URL}/user/social/github/start`}>
        Login with Github
      </a>
    </div>
  );
};

export default Login;
