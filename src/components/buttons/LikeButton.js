import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext";
import { cancelLike, checkArray, like } from "../../controllers/userController";
import styles from "../../css/Button.module.css";

const LikeButton = ({ lectureId }) => {
  const { user, setUser } = useContext(UserContext);
  const [active, setActive] = useState(false);
  const [isHated, setIsHated] = useState(false);

  const onClick = (event) => {
    event.preventDefault();
    if (active) {
      cancelLike(lectureId);
      setUser({
        ...user,
        liked: user.liked.filter(
          (aLike) => String(aLike) !== String(lectureId)
        ),
      });
    } else {
      like(lectureId);
      setUser({
        ...user,
        liked: [lectureId, ...user.liked],
        hated: !isHated
          ? user.hated
          : user.hated.filter((aHate) => String(aHate) !== String(lectureId)),
      });
    }
    setActive((current) => !current);
  };

  useEffect(() => {
    if (checkArray(user.liked, lectureId)) {
      setActive(true);
    } else {
      setActive(false);
    }

    if (checkArray(user.hated, lectureId)) {
      setIsHated(true);
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
        <i className={`fas fa-thumbs-up ${styles.icon}`}></i>
      </button>
    </div>
  );
};

export default LikeButton;
