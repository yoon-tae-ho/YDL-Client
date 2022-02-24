import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../css/Preview.module.css";

import PlayButton from "./buttons/PlayButton";
import BookButton from "./buttons/BookButton";
import LikeButton from "./buttons/LikeButton";
import HateButton from "./buttons/HateButton";
import DeleteButton from "./buttons/DeleteButton";
import DetailButton from "./buttons/DetailButton";

const getTopics = (topics, VISUAL_TOPICS) => {
  const result = [];
  for (let i = 0; i < VISUAL_TOPICS; ++i) {
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
  thumbnailUrl,
  topics,
  setPreviewHovered,
  isFirstItem,
  isLastItem,
}) => {
  const VISUAL_TOPICS = 3;
  const [hovered, setHovered] = useState(false);
  const [timeoutId, setTimeoutId] = useState("");

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

  return (
    <div className={`${className}`}>
      <Link
        className={getLinkClassName(hovered, isFirstItem, isLastItem)}
        to={`/browse/${id}`}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <img
          className={`${styles.thumbnail} ${
            hovered ? styles.hoveredImg : null
          }`}
          src={thumbnailUrl}
          alt={process.env.THUMBNAIL_ALT}
          width={160}
          height={90}
        />
        <div
          className={`${styles.info_container} ${
            hovered ? styles.hoveredInfo : null
          }`}
        >
          {hovered && (
            <div className={styles.buttonContainer}>
              <PlayButton />
              <BookButton />
              <LikeButton />
              <HateButton />
              <DeleteButton />
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
          {hovered && (
            <ul className={styles.topicList}>
              {getTopics(topics, VISUAL_TOPICS)}
            </ul>
          )}
        </div>
      </Link>
    </div>
  );
};

export default Preview;
