import React, { useState } from "react";
import styles from "../../css/Button.module.css";

const LikeButton = () => {
  const [clicked, setClicked] = useState(false);
  const onClick = () => {};
  return (
    <div>
      <button
        className={`${styles.button} ${styles.meta_button} ${
          clicked ? styles.active : null
        }`}
        onClick={onClick}
      >
        <i className={`fas fa-thumbs-up ${styles.icon}`}></i>
      </button>
    </div>
  );
};

export default LikeButton;
