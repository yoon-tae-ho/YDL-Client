import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import styles from "../css/Header.module.css";

const Header = () => {
  const [scroll, setScroll] = useState(0);
  const { loggedIn } = useContext(UserContext);

  useEffect(() => {
    window.addEventListener("scroll", () => setScroll(window.scrollY));
    return window.removeEventListener("scroll", () =>
      setScroll(window.scrollY)
    );
  }, []);

  return (
    <div
      className={`${styles.header} ${scroll === 0 ? styles.transparent : null}`}
    >
      <div className={styles.header_column}>
        <Link to="/browse" className={styles.logo}>
          YDL
        </Link>
        <ul className={styles.primary_navigation}>
          <li>
            <Link to="/browse">홈</Link>
          </li>
          <li>
            <Link to="/browse/my-list">내가 찜한 강의</Link>
          </li>
        </ul>
      </div>
      <div className={styles.secondary_navigation}>
        <div className={styles.nav_element}>
          <i className="fas fa-search"></i>
        </div>
        <div className={styles.nav_element}>
          <i className="fas fa-bell"></i>
        </div>
        <div className={styles.nav_element}>
          {loggedIn ? (
            // <i className="fas fa-user"></i>
            <Link to="/logout">로그아웃</Link>
          ) : (
            <Link to="/login">로그인</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
