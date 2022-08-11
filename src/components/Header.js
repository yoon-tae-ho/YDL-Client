import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchContext from "../contexts/SearchContext";
import UserContext from "../contexts/UserContext";
import styles from "../css/Header.module.css";

const focusInput = (input) => {
  if (input) {
    input.focus();
  }
};

const Header = () => {
  const { isSearching, setIsSearching, text, setText, stopSearching } =
    useContext(SearchContext);
  const { loggedIn, user } = useContext(UserContext);
  const [scroll, setScroll] = useState(0);
  const [userHovered, setUserHovered] = useState(false);
  const [userTimeoutId, setUserTimeoutId] = useState("");

  const inputRef = useRef();
  const navigate = useNavigate();

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

  const onSearchClick = () => {
    if (!isSearching) {
      setIsSearching(true);
    }
  };

  const onSearchInput = (event) => {
    const value = event.target.value;
    if (value.length !== 0) {
      // navigate to /search
      const param = new URLSearchParams({ q: value });
      navigate(`/search?${param}`, {
        replace: window.location.pathname === "/search" ? true : false,
      });
    } else if (text.length !== 0 && value.length === 0) {
      // navigate to back
      setText(value);
      navigate(-1, { replace: true });
    }
  };

  const onSearchBlur = () => {
    if (text.length === 0) {
      setIsSearching(false);
    }
  };

  const onRefreshClick = () => {
    setText("");
    navigate(-1, { replace: true });
    inputRef.current.value = "";
    focusInput(inputRef.current);
  };

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (y === 0) {
        setScroll(0);
      } else if (scroll === 0) {
        setScroll(y);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scroll]);

  useEffect(() => {
    if (isSearching) {
      focusInput(inputRef.current);
    }
  }, [isSearching]);

  return (
    <header
      className={`${styles.header} ${scroll === 0 ? styles.transparent : null}`}
    >
      <div className={styles.header_column}>
        <Link to="/browse" className={styles.logo} onClick={stopSearching}>
          YDL
        </Link>
        <ul className={styles.primary_navigation}>
          <li>
            <Link to="/browse" onClick={stopSearching}>
              홈
            </Link>
          </li>
          <li>
            <Link to="/browse/topics/my-list" onClick={stopSearching}>
              내가 찜한 강의
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.secondary_navigation}>
        <div className={styles.nav_element}>
          <div
            className={`${styles.search_box}${
              isSearching ? ` ${styles.search_box_active}` : ""
            }`}
          >
            <div className={styles.search_icon_column}>
              <i
                className={`fas fa-search ${styles.search_icon}${
                  isSearching ? ` ${styles.search_icon_active}` : ""
                }`}
                onClick={onSearchClick}
              ></i>
            </div>
            {isSearching && (
              <>
                <input
                  ref={inputRef}
                  className={styles.search_input}
                  placeholder="제목, 사람, 토픽"
                  maxLength="80"
                  // value={text} // 한글 자음 모음 분리 현상 방지
                  onInput={onSearchInput}
                  onBlur={onSearchBlur}
                />
                <div className={styles.search_icon_column}>
                  {text.length !== 0 && (
                    <i
                      className={`fas fa-times ${styles.refresh_icon}`}
                      onClick={onRefreshClick}
                    ></i>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
        {/* <div className={styles.nav_element}>
          <i className="fas fa-bell"></i>
        </div> */}
        <div className={styles.user_wrapper}>
          <div className={styles.nav_element}>
            {!loggedIn ? (
              <Link to="/login" onClick={stopSearching}>
                로그인
              </Link>
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
                        <Link
                          className={styles.user_menu_link}
                          to=""
                          onClick={stopSearching}
                        >
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
                          onClick={stopSearching}
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
    </header>
  );
};

export default Header;
