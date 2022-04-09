import React from "react";
import styles from "../css/RowLoading.module.css";

const getItems = (max) => {
  const items = [];
  for (let i = 0; i < max; ++i) {
    items.push(
      <div
        className={styles.item}
        key={`rowLoading_item_${i}`}
        style={{
          WebkitAnimationDelay: `${0.2 * i}s`,
          animationDelay: `${0.2 * i}s`,
        }}
      ></div>
    );
  }
  return items;
};

const RowLoading = ({ header }) => {
  return (
    <div className={styles.row}>
      {header && (
        <div className={styles.header}>
          <div className={styles.title}></div>
        </div>
      )}
      <div className={styles.content}>{getItems(7)}</div>
    </div>
  );
};

export default RowLoading;
