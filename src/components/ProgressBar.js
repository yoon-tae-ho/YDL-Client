import React from "react";
import styles from "../css/ProgressBar.module.css";

const ProgressBar = ({ progress }) => {
  return (
    <span className={styles.progress_bar}>
      <span
        className={styles.progress_completed}
        style={{ width: `${progress}%` }}
      ></span>
    </span>
  );
};

export default ProgressBar;
