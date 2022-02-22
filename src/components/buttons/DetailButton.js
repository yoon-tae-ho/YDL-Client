import React from "react";
import styles from "../../css/Button.module.css";

const DetailButton = () => {
  return (
    <div>
      <button className={`${styles.button} ${styles.detail_button}`}>
        <i className={`fas fa-chevron-down ${styles.icon}`}></i>
      </button>
    </div>
  );
};

export default DetailButton;
