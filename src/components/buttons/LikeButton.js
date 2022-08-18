import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import { cancelLike, checkArray, like } from "../../controllers/userController";
import styles from "../../css/Button.module.css";
import { useAnalyticsEventTracker } from "../../hooks";

const LikeButton = ({ lectureId }) => {
  const {
    loggedIn,
    setUser,
    user: { liked, hated },
  } = useContext(UserContext);
  const [active, setActive] = useState(false);
  const [isHated, setIsHated] = useState(false);
  const navigate = useNavigate();

  // Google Analytics
  const gaEventTracker = useAnalyticsEventTracker("Lecture");

  const onClick = (event) => {
    event.preventDefault();

    if (!loggedIn) {
      return navigate("/login");
    }

    if (active) {
      cancelLike(lectureId);
      setUser((current) => ({
        ...current,
        liked: current.liked.filter(
          (aLike) => String(aLike) !== String(lectureId)
        ),
      }));
    } else {
      like(lectureId);
      setUser((current) => ({
        ...current,
        liked: [lectureId, ...current.liked],
        hated: !isHated
          ? current.hated
          : current.hated.filter(
              (aHate) => String(aHate) !== String(lectureId)
            ),
      }));
    }
    const prevActive = active;
    setActive((current) => !current);

    gaEventTracker(
      "Like",
      `${lectureId}-${prevActive ? "Deactivate" : "Activate"}`
    );
  };

  useEffect(() => {
    if (loggedIn && checkArray(liked, lectureId)) {
      setActive(true);
    } else {
      setActive(false);
    }

    if (loggedIn && checkArray(hated, lectureId)) {
      setIsHated(true);
    }
  }, [loggedIn, liked, hated, lectureId]);

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
