import React from "react";
import styles from "../css/RowLoading.module.css";

const RowLoading = ({ header }) => {
  return (
    <div className={styles.row}>
      {header && (
        <div className={styles.header}>
          <div className={styles.title}></div>
        </div>
      )}
      <div className={styles.content}></div>
    </div>
  );
};

export default RowLoading;
