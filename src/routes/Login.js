import React, { useContext, useEffect } from "react";

import styles from "../css/Login.module.css";
import Google from "../images/google_logo.svg";
import Kakao from "../images/kakao_logo.svg";
import Naver from "../images/naver_logo.svg";
import Github from "../images/github_logo.svg";
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useAnalyticsEventTracker } from "../hooks";

const Login = () => {
  const { loggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  // Google Analytics
  const gaEventTracker = useAnalyticsEventTracker("Login");

  useEffect(() => {
    if (loggedIn) {
      navigate("/", { replace: true });
    }
  }, [loggedIn]);

  return (
    <>
      <div className={styles.background}>
        <main className={styles.socials}>
          <div className={`${styles.social} ${styles.social_google}`}>
            <a
              href={`${process.env.REACT_APP_API_URL}/user/social/google/start`}
              className={styles.social_link}
              onClick={() => gaEventTracker("Google", "")}
            >
              <div className={styles.social_left}>
                <img
                  className={styles.logo}
                  src={Google}
                  alt={process.env.REACT_APP_THUMBNAIL_ALT}
                  // 출처: https://freesvg.org/1534129544
                />
              </div>
              <div className={styles.social_right}>
                <h4 className={styles.social_text}>구글로 로그인</h4>
              </div>
            </a>
          </div>
          <div className={`${styles.social} ${styles.social_kakao}`}>
            <a
              href={`${process.env.REACT_APP_API_URL}/user/social/kakao/start`}
              className={styles.social_link}
              onClick={() => gaEventTracker("Kakao", "")}
            >
              <div className={styles.social_left}>
                <img
                  className={styles.logo}
                  src={Kakao}
                  alt={process.env.REACT_APP_THUMBNAIL_ALT}
                  // 출처: https://www.svgrepo.com/svg/368252/kakao
                />
              </div>
              <div className={styles.social_right}>
                <h4 className={styles.social_text}>카카오로 로그인</h4>
              </div>
            </a>
          </div>
          <div className={`${styles.social} ${styles.social_naver}`}>
            <a
              href={`${process.env.REACT_APP_API_URL}/user/social/naver/start`}
              className={styles.social_link}
              onClick={() => gaEventTracker("Naver", "")}
            >
              <div className={styles.social_left}>
                <div className={styles.naver_logo_background}></div>
                <img
                  className={styles.logo}
                  src={Naver}
                  alt={process.env.REACT_APP_THUMBNAIL_ALT}
                  // 출처: https://simpleicons.org/?q=naver
                />
              </div>
              <div className={styles.social_right}>
                <h4 className={styles.social_text}>네이버로 로그인</h4>
              </div>
            </a>
          </div>
          <div className={`${styles.social} ${styles.social_github}`}>
            <a
              href={`${process.env.REACT_APP_API_URL}/user/social/github/start`}
              className={styles.social_link}
              onClick={() => gaEventTracker("Github", "")}
            >
              <div className={styles.social_left}>
                <img
                  className={styles.logo}
                  src={Github}
                  alt={process.env.REACT_APP_THUMBNAIL_ALT}
                  // 출처: https://www.svgrepo.com/svg/344880/github
                />
              </div>
              <div className={styles.social_right}>
                <h4 className={styles.social_text}>깃허브로 로그인</h4>
              </div>
            </a>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Login;
