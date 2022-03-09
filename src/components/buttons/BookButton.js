import React, { useContext, useEffect, useState } from "react";
import styles from "../../css/Button.module.css";
import UserContext from "../../contexts/UserContext";
import { book, cancelBook, checkArray } from "../../controllers/userController";

const BookButton = ({ lectureId }) => {
  const { user, setUser } = useContext(UserContext);
  const [active, setActive] = useState(false);

  const onClick = (event) => {
    event.preventDefault();
    if (active) {
      cancelBook(lectureId);
      setUser({
        ...user,
        booked: user.booked.filter(
          (aBook) => String(aBook) !== String(lectureId)
        ),
      });
    } else {
      book(lectureId);
      setUser({
        ...user,
        booked: [lectureId, ...user.booked],
      });
    }
    setActive((current) => !current);
  };

  useEffect(() => {
    if (checkArray(user.booked, lectureId)) {
      setActive(true);
    }
  }, [user, lectureId]);

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
