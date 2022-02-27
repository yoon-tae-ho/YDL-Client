import React, { useState } from "react";
import styles from "../../css/MoreButton.module.css";

const MoreButton = ({ clickHandler }) => {
  const [active, setActive] = useState(false);
  const onActive = () => setActive((current) => !current);
  const onClick = (event) => {
    event.preventDefault();
    clickHandler();
    onActive();
  };

  return (
    <button
      className={`${styles.button}${active ? ` ${styles.active}` : ""}`}
      onClick={onClick}
    >
      <i className="fas fa-caret-down"></i>
    </button>
  );
};

export default MoreButton;
