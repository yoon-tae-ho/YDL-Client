import React, { useState } from "react";
import styles from "../../css/Button.module.css";

const BookButton = () => {
  const [clicked, setClicked] = useState(false);
  const onClick = () => {};
  return (
    <div>
      <button
        className={`${styles.button} ${styles.book_button} ${
          clicked ? styles.active : null
        }`}
        onClick={onClick}
      >
        <i className={`fas fa-plus ${styles.icon}`}></i>
      </button>
    </div>
  );
};

export default BookButton;
