import React from "react";
import styles from "../../css/Button.module.css";
import { useAnalyticsEventTracker } from "../../hooks";

const DeleteButton = ({ lectureId }) => {
  // Google Analytics
  const gaEventTracker = useAnalyticsEventTracker("Lecture");

  const onClick = () => {
    gaEventTracker("Delete in Viewed List", `${lectureId}`);
  };

  return (
    <div>
      <button
        className={`${styles.button} ${styles.delete_button}`}
        onClick={onClick}
      >
        <i className={`fas fa-times ${styles.icon}`}></i>
      </button>
    </div>
  );
};

export default DeleteButton;
