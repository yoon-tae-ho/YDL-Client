import React from "react";
import { Link } from "react-router-dom";
import styles from "../css/Header.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
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
          <i className="fas fa-user"></i>
        </div>
      </div>
    </div>
  );
};

export default Header;
