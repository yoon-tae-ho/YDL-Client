import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import styles from "../../css/Button.module.css";

const checkViewed = (viewList, targetId) => {
  let result = -1;
  for (let i = 0; i < viewList.length; ++i) {
    if (String(viewList[i].lectureId) === String(targetId)) {
      result = i;
      break;
    }
  }
  return result;
};

const PlayButton = ({ shape, lectureId, firstVideo }) => {
  const {
    loggedIn,
    user: { viewed },
  } = useContext(UserContext);
  const [playIndex, setPlayIndex] = useState(-1);
  const [isRec, setIsRec] = useState(false);
  const navigate = useNavigate();

  const onClick = (event) => {
    event.preventDefault();

    // viewed video
    if (playIndex !== -1) {
      return navigate(`/watch/${viewed[playIndex].videos[0].videoId}`);
    }

    // first video
    if (firstVideo) {
      return navigate(`/watch/${firstVideo._id}`);
    }
  };

  // check viewded
  useEffect(() => {
    if (loggedIn) {
      const index = checkViewed(viewed, lectureId);
      if (index !== -1) {
        setPlayIndex(index);
      }
    }
  }, [viewed, lectureId, loggedIn]);

  // check shape
  useEffect(() => {
    setIsRec(shape === "rectangular");
  }, [shape]);

  return (
    <div>
      <button
        className={`${styles.button} ${styles.play_button}${
          isRec ? ` ${styles.play_rectangular}` : ""
        }`}
        onClick={onClick}
      >
        <i className={`fas fa-play ${styles.icon}`}></i>
        {isRec && <span className={styles.play_text}>재생</span>}
      </button>
    </div>
  );
};

export default PlayButton;
