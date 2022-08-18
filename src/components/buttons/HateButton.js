import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import { cancelHate, checkArray, hate } from "../../controllers/userController";
import styles from "../../css/Button.module.css";
import { useAnalyticsEventTracker } from "../../hooks";

const HateButton = ({ lectureId }) => {
  const {
    loggedIn,
    setUser,
    user: { hated, liked },
  } = useContext(UserContext);
  const [active, setActive] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  // Google Analytics
  const gaEventTracker = useAnalyticsEventTracker("Lecture");

  const onClick = (event) => {
    event.preventDefault();

    if (!loggedIn) {
      return navigate("/login");
    }

    if (active) {
      cancelHate(lectureId);
      setUser((current) => ({
        ...current,
        hated: current.hated.filter(
          (aHated) => String(aHated) !== String(lectureId)
        ),
      }));
    } else {
      hate(lectureId);
      setUser((current) => ({
        ...current,
        hated: [lectureId, ...current.hated],
        liked: !isLiked
          ? current.liked
          : current.liked.filter(
              (aLike) => String(aLike) !== String(lectureId)
            ),
      }));
    }
    const prevActive = active;
    setActive((current) => !current);

    gaEventTracker(
      "Hate",
      `${lectureId}-${prevActive ? "Deactivate" : "Activate"}`
    );
  };

  useEffect(() => {
    if (loggedIn && checkArray(hated, lectureId)) {
      setActive(true);
    } else {
      setActive(false);
    }

    if (loggedIn && checkArray(liked, lectureId)) {
      setIsLiked(true);
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
        <i className={`fas fa-thumbs-down ${styles.icon}`}></i>
      </button>
    </div>
  );
};

export default HateButton;
