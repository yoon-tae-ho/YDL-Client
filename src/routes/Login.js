import React from "react";
import Header from "../components/Header";
import styles from "../css/Login.module.css";

const Login = () => {
  return (
    <>
      <Header />
      <div className={styles.background}>
        <main className={styles.socials}>
          <div className={`${styles.social} ${styles.social_google}`}>
            <a
              href={`${process.env.REACT_APP_API_URL}/user/social/google/start`}
              className={styles.social_link}
            >
              <div className={styles.social_left}>
                <img
                  className={styles.logo}
                  src="https://freesvg.org/img/1534129544.png"
                  alt={process.env.REACT_APP_THUMBNAIL_ALT}
                  // 출처: https://freesvg.org/1534129544
                />
              </div>
              <div className={styles.social_right}>
                <h4 className={styles.social_text}>Login with Google</h4>
              </div>
            </a>
          </div>
          <div className={`${styles.social} ${styles.social_kakao}`}>
            <a
              href={`${process.env.REACT_APP_API_URL}/user/social/kakao/start`}
              className={styles.social_link}
            >
              <div className={styles.social_left}>
                <img
                  className={styles.logo}
                  src="https://www.svgrepo.com/show/368252/kakao.svg"
                  alt={process.env.REACT_APP_THUMBNAIL_ALT}
                  // 출처: https://www.svgrepo.com/svg/368252/kakao
                />
              </div>
              <div className={styles.social_right}>
                <h4 className={styles.social_text}>Login with Kakao</h4>
              </div>
            </a>
          </div>
          <div className={`${styles.social} ${styles.social_naver}`}>
            <a
              href={`${process.env.REACT_APP_API_URL}/user/social/naver/start`}
              className={styles.social_link}
            >
              <div className={styles.social_left}>
                <div className={styles.naver_logo_background}></div>
                <svg
                  className={styles.logo}
                  fill="#1ec800"
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  // 출처: https://simpleicons.org/?q=naver
                >
                  <title>Naver</title>
                  <path d="M1.6 0S0 0 0 1.6v20.8S0 24 1.6 24h20.8s1.6 0 1.6-1.6V1.6S24 0 22.4 0zm3.415 5.6h4.78l4.425 6.458V5.6h4.765v12.8h-4.78L9.78 11.943V18.4H5.015Z" />
                </svg>
              </div>
              <div className={styles.social_right}>
                <h4 className={styles.social_text}>Login with Naver</h4>
              </div>
            </a>
          </div>
          <div className={`${styles.social} ${styles.social_github}`}>
            <a
              href={`${process.env.REACT_APP_API_URL}/user/social/github/start`}
              className={styles.social_link}
            >
              <div className={styles.social_left}>
                <img
                  className={styles.logo}
                  src="https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_1280.png"
                  alt={process.env.REACT_APP_THUMBNAIL_ALT}
                  // 출처: https://pixabay.com/ko/vectors/github-%ea%b9%83%ed%97%88%eb%b8%8c-%eb%a1%9c%ea%b3%a0-6980894/
                />
              </div>
              <div className={styles.social_right}>
                <h4 className={styles.social_text}>Login with Github</h4>
              </div>
            </a>
          </div>
        </main>
      </div>
    </>
  );
};

export default Login;
