import React from "react";
import styles from "../../css/Button.module.css";

const PlayButton = ({ shape }) => {
  const isRec = shape === "rectangular";
  return (
    <div>
      <button
        className={`${styles.button} ${styles.play_button}${
          isRec ? ` ${styles.play_rectangular}` : ""
        }`}
      >
        <i className={`fas fa-play ${styles.icon}`}></i>
        {isRec && <span className={styles.play_text}>재생</span>}
      </button>
    </div>
  );
};

export default PlayButton;
