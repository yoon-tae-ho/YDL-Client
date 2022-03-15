import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import styles from "../css/Header.module.css";

const Header = () => {
  const { loggedIn, user } = useContext(UserContext);
  const [scroll, setScroll] = useState(0);
  const [userHovered, setUserHovered] = useState(false);
  const [userTimeoutId, setUserTimeoutId] = useState("");

  const onUserMouseMove = () => {
    if (userTimeoutId) {
      clearTimeout(userTimeoutId);
      setUserTimeoutId("");
    }
    if (!userHovered) {
      setUserHovered(true);
    }
  };

  const onUserMouseLeave = () => {
    if (!userTimeoutId) {
      const id = setTimeout(() => {
        setUserHovered(false);
      }, 300);
      setUserTimeoutId(id);
    }
  };

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
          <i className={`fas fa-search ${styles.search_icon}`}></i>
        </div>
        {/* <div className={styles.nav_element}>
          <i className="fas fa-bell"></i>
        </div> */}
        <div className={styles.user_wrapper}>
          <div className={styles.nav_element}>
            {!loggedIn ? (
              <Link to="/login">로그인</Link>
            ) : (
              <div
                className={styles.user_container}
                onMouseMove={onUserMouseMove}
                onMouseLeave={onUserMouseLeave}
              >
                {!user.avatarUrl ? (
                  <i
                    className={`fas fa-user-graduate ${styles.user_alt_icon}`}
                  ></i>
                ) : (
                  <img
                    className={styles.user_thumbnail}
                    src={user.avatarUrl}
                    alt={process.env.REACT_APP_THUMBNAIL_ALT}
                  />
                )}
                <i
                  className={`fas fa-caret-down ${styles.user_more}${
                    userHovered ? ` ${styles.more_active}` : ""
                  }`}
                ></i>
                {userHovered && (
                  <i
                    className={`fas fa-caret-up fa-lg ${styles.user_menu_arrow}`}
                  ></i>
                )}
                {userHovered && (
                  <div className={styles.user_menu}>
                    <ul className={styles.user_menu_list}>
                      <li className={styles.user_menu_item}>
                        <Link className={styles.user_menu_link} to="">
                          <i
                            className={`fas fa-user fa-lg ${styles.user_menu_icon}`}
                          ></i>
                          <span>계정</span>
                        </Link>
                      </li>
                    </ul>
                    <ul className={styles.user_menu_list}>
                      <li className={styles.user_menu_item}>
                        <Link
                          className={`${styles.user_menu_link} ${styles.sign_out_link}`}
                          to="/logout"
                        >
                          YDL에서 로그아웃
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
