import React from "react";
import styles from "../../css/Button.module.css";

const DeleteButton = () => {
  return (
    <div>
      <button className={`${styles.button} ${styles.delete_button}`}>
        <i className={`fas fa-times ${styles.icon}`}></i>
      </button>
    </div>
  );
};

export default DeleteButton;
