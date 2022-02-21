import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../css/Preview.module.css";

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

const Preview = ({
  className,
  id,
  title,
  thumbnailUrl,
  topics,
  setPreviewHovered,
}) => {
  const VISUAL_TOPICS = 3;
  const [hovered, setHovered] = useState(false);
  const [timeoutId, setTimeoutId] = useState("");
  const onMouseMove = (event) => {
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

  // makes belonged content's z-index bigger.
  useEffect(() => setPreviewHovered(hovered), [setPreviewHovered, hovered]);

  return (
    <div className={`${className}`}>
      <Link
        className={`${styles.link} ${hovered ? styles.hoveredLink : null}`}
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
          <h2 className={styles.title}>{title}</h2>
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
