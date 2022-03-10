import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import { getVideoPath } from "../../controllers/lectureController";
import styles from "../../css/Button.module.css";

const checkViewed = (viewList, targetId) => {
  let result = -1;
  for (let i = 0; i < viewList.length; ++i) {
    if (String(viewList[i].video.belongIn) === String(targetId)) {
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
      const path = getVideoPath(
        viewed[playIndex].video.player,
        viewed[playIndex].video.embededCode
      );
      return navigate(path);
    }

    // first video
    if (firstVideo) {
      const path = getVideoPath(firstVideo.player, firstVideo.embededCode);
      return navigate(path);
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
  }, [viewed, lectureId]);

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
