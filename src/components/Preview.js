import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import styles from "../css/Preview.module.css";
import PlayButton from "./buttons/PlayButton";
import BookButton from "./buttons/BookButton";
import LikeButton from "./buttons/LikeButton";
import HateButton from "./buttons/HateButton";
import DeleteButton from "./buttons/DeleteButton";
import DetailButton from "./buttons/DetailButton";
import { getFirstVideo } from "../controllers/lectureController";
import ProgressBar from "./ProgressBar";
import UserContext from "../contexts/UserContext";
import Flag from "./Flag";
import SearchContext from "../contexts/SearchContext";

const getFlagSrc = (institute) => {
  let imgSrc = "";
  switch (institute) {
    case "Massachusetts Institute of Technology":
      imgSrc =
        "https://upload.wikimedia.org/wikipedia/commons/0/0c/MIT_logo.svg";
      break;
    case "Oxford University":
      imgSrc =
        "https://upload.wikimedia.org/wikipedia/commons/f/ff/Oxford-University-Circlet.svg";
      break;
    case "Yale University":
      imgSrc =
        "https://upload.wikimedia.org/wikipedia/commons/0/07/Yale_University_Shield_1.svg";
      break;
    case "Stanford University":
      imgSrc =
        "https://upload.wikimedia.org/wikipedia/commons/c/c8/Logo_of_Stanford_University.png";
      break;
    default:
      break;
  }
  return imgSrc;
};

const getTopics = (topics, VISIBLE_TOPICS) => {
  const result = [];
  const indicator =
    VISIBLE_TOPICS < topics.length ? VISIBLE_TOPICS : topics.length;
  for (let i = 0; i < indicator; ++i) {
    result.push(
      <li key={topics[i]._id} className={styles.topicItem}>
        {i !== 0 && (
          <i className={`fas fa-circle fa-xs ${styles.topicSeparator}`}></i>
        )}
        <span className={styles.topicText}>{topics[i].name}</span>
      </li>
    );
  }
  return result;
};

const getLinkClassName = (hovered, isFirstItem, isLastItem) => {
  let result = `${styles.link}`;
  if (hovered) {
    if (isFirstItem) {
      result += ` ${styles.firstHoveredLink}`;
    } else if (isLastItem) {
      result += ` ${styles.lastHoveredLink}`;
    } else {
      result += ` ${styles.hoveredLink}`;
    }
  }
  return result;
};

const Preview = ({
  className,
  id,
  title,
  topics,
  institute,
  thumbnailUrl,
  setPreviewHovered,
  isFirstItem,
  isLastItem,
  sliderTopic,
}) => {
  const VISIBLE_TOPICS = 3;
  const { loggedIn, user } = useContext(UserContext);
  const { stopSearching } = useContext(SearchContext);
  const [hovered, setHovered] = useState(false);
  const [timeoutId, setTimeoutId] = useState("");
  const [isContinueWatching, setIsContinueWatching] = useState(false);
  const [videoInfo, setVideoInfo] = useState({});
  const [progress, setProgress] = useState(0);

  // fetch first video's embededCode and player when hovered
  const { data: firstVideo } = useQuery(
    ["firstVideo", id],
    () => getFirstVideo(id),
    {
      enabled: hovered,
    }
  );

  const onMouseMove = () => {
    if (!timeoutId) {
      const id = setTimeout(() => {
        setHovered(true);
      }, 500);
      setTimeoutId(id);
    }
  };
  const onMouseLeave = () => {
    setHovered(false);
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId("");
    }
  };

  // clear timeout
  useEffect(() => {
    return onMouseLeave;
  }, []);

  // makes belonged content's z-index bigger.
  useEffect(() => setPreviewHovered(hovered), [setPreviewHovered, hovered]);

  // get progress
  useEffect(() => {
    if (loggedIn && sliderTopic === process.env.REACT_APP_CONTINUE_WATCHING) {
      const aView = user.viewed.find((aView) => aView.lectureId === id);
      if (aView) {
        const { time, duration } = aView.videos[0];
        setVideoInfo(aView.videos[0]);
        setProgress((time / duration) * 100);
        setIsContinueWatching(true);
      }
    }
  }, [loggedIn, id, user?.viewed, sliderTopic]);

  return (
    <div className={`${className}`}>
      <Link
        className={getLinkClassName(hovered, isFirstItem, isLastItem)}
        to={`/browse/${id}`}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onClick={stopSearching}
      >
        <img
          className={`${styles.thumbnail} ${
            hovered ? styles.hoveredImg : null
          }`}
          src={thumbnailUrl}
          alt={process.env.THUMBNAIL_ALT}
        />
        <Flag imgSrc={getFlagSrc(institute)} />
        {isContinueWatching && !hovered && (
          <div className={styles.progress}>
            <ProgressBar progress={progress} />
          </div>
        )}
        <div
          className={`${styles.info_container} ${
            hovered ? styles.hoveredInfo : null
          }`}
        >
          {hovered && (
            <div className={styles.buttonContainer}>
              <PlayButton lectureId={id} firstVideo={firstVideo} />
              <BookButton lectureId={id} />
              <LikeButton lectureId={id} />
              <HateButton lectureId={id} />
              <DetailButton />
            </div>
          )}
          <h2
            className={`${styles.title} ${
              hovered ? styles.hoveredTitle : null
            }`}
          >
            {title}
          </h2>
          {hovered &&
            (isContinueWatching ? (
              <div className={styles.watching_info}>
                <span className={styles.watching_text}>
                  <strong className={styles.strong}>{`${
                    videoInfo.videoIndex + 1
                  }강`}</strong>
                  {` "${videoInfo.videoTitle}"`}
                </span>
                <div className={styles.progress_container}>
                  <div className={styles.progress_hovered}>
                    <ProgressBar progress={progress} />
                  </div>
                  <span className={styles.progress_text}>{`총 ${Math.floor(
                    videoInfo.duration / 60
                  )}분 중 ${Math.floor(videoInfo.time / 60)}분`}</span>
                </div>
              </div>
            ) : (
              <ul className={styles.topicList}>
                {getTopics(topics, VISIBLE_TOPICS)}
              </ul>
            ))}
        </div>
      </Link>
    </div>
  );
};

export default React.memo(Preview);
