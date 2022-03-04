import React from "react";
import styles from "../css/Input.module.css";

const Input = ({ reference, ...props }) => {
  return (
    <input
      className={props.type === "submit" ? styles.submit : styles.input}
      {...props}
      ref={reference}
    />
  );
};

export default Input;
