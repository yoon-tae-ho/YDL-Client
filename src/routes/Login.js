import React from "react";
import Header from "../components/Header";

const Login = () => {
  return (
    <div style={{ marginTop: "100px" }}>
      <Header />
      <div>
        <a href={`${process.env.REACT_APP_API_URL}/user/social/github/start`}>
          <i className="fab fa-github"></i>
          Login with Github
        </a>
      </div>
      <div>
        <a href={`${process.env.REACT_APP_API_URL}/user/social/kakao/start`}>
          Login with Kakao
        </a>
      </div>
      <div>
        <a href={`${process.env.REACT_APP_API_URL}/user/social/naver/start`}>
          Login with Naver
        </a>
      </div>
    </div>
  );
};

export default Login;
