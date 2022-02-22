import React from "react";
import styles from "../../css/Button.module.css";

const PlayButton = (shape) => {
  return (
    <div>
      <button className={`${styles.button} ${styles.play_button}`}>
        <i className={`fas fa-play ${styles.icon}`}></i>
      </button>
    </div>
  );
};

export default PlayButton;
