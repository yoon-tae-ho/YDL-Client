import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext";
import { cancelHate, checkArray, hate } from "../../controllers/userController";
import styles from "../../css/Button.module.css";

const HateButton = ({ lectureId }) => {
  const { user, setUser } = useContext(UserContext);
  const [active, setActive] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const onClick = (event) => {
    event.preventDefault();
    if (active) {
      cancelHate(lectureId);
      setUser({
        ...user,
        hated: user.hated.filter(
          (aHated) => String(aHated) !== String(lectureId)
        ),
      });
    } else {
      hate(lectureId);
      setUser({
        ...user,
        hated: [lectureId, ...user.hated],
        liked: !isLiked
          ? user.liked
          : user.liked.filter((aLike) => String(aLike) !== String(lectureId)),
      });
    }
    setActive((current) => !current);
  };

  useEffect(() => {
    if (checkArray(user.hated, lectureId)) {
      setActive(true);
    } else {
      setActive(false);
    }

    if (checkArray(user.liked, lectureId)) {
      setIsLiked(true);
    }
  }, [user, lectureId]);

  return (
    <div>
      <button
        className={`${styles.button} ${styles.meta_button} ${
          active ? styles.active : null
        }`}
        onClick={onClick}
      >
        <i className={`fas fa-thumbs-down ${styles.icon}`}></i>
      </button>
    </div>
  );
};

export default HateButton;
