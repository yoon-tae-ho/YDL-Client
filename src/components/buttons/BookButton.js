import React, { useContext, useEffect, useState } from "react";
import styles from "../../css/Button.module.css";
import UserContext from "../../contexts/UserContext";
import { book, cancelBook, checkArray } from "../../controllers/userController";
import { useNavigate } from "react-router-dom";

const BookButton = ({ lectureId }) => {
  const {
    loggedIn,
    setUser,
    user: { booked },
  } = useContext(UserContext);
  const [active, setActive] = useState(false);
  const navigate = useNavigate();

  const onClick = (event) => {
    event.preventDefault();

    if (!loggedIn) {
      return navigate("/login");
    }

    if (active) {
      cancelBook(lectureId);
      setUser((current) => ({
        ...current,
        booked: current.booked.filter(
          (aBook) => String(aBook) !== String(lectureId)
        ),
      }));
    } else {
      book(lectureId);
      setUser((current) => ({
        ...current,
        booked: [lectureId, ...current.booked],
      }));
    }
    setActive((current) => !current);
  };

  useEffect(() => {
    if (loggedIn && checkArray(booked, lectureId)) {
      setActive(true);
    }
  }, [loggedIn, booked, lectureId]);

  return (
    <div>
      <button
        className={`${styles.button} ${styles.book_button} ${
          active ? styles.active : null
        }`}
        onClick={onClick}
      >
        {active ? (
          <i className={`fas fa-check ${styles.icon}`}></i>
        ) : (
          <i className={`fas fa-plus ${styles.icon}`}></i>
        )}
      </button>
    </div>
  );
};

export default BookButton;
