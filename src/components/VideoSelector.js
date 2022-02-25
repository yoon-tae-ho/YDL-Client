import React, { useState } from "react";

import { Link } from "react-router-dom";
import styles from "../css/VideoSelector.module.css";

const VideoSelector = ({ video, index, path }) => {
  const [hovered, setHovered] = useState(false);
  const onMouseMove = () => !hovered && setHovered(true);
  const onMouseLeave = () => setHovered(false);

  return (
    <Link
      to={path}
      className={styles.selector_Link}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className={styles.selector_item}>
        <div className={styles.video_index}>{index + 1}</div>
        <div className={styles.video_imgWrapper}>
          <img
            className={styles.video_thumbnail}
            src={video.thumbnailUrl}
            alt={process.env.REACT_APP_THUMBNAIL_ALT}
          />
          <div className={styles.video_playWrapper}>
            <i
              className={`fas fa-play-circle ${styles.video_playIcon}${
                hovered ? ` ${styles.playIcon_hovered}` : ""
              }`}
            ></i>
          </div>
        </div>
        <div className={styles.video_metadataWrapper}>
          <div className={styles.video_header}>
            <span className={styles.video_title}>{video.title}</span>
            <span className={styles.video_duration}></span>
          </div>
          {video.description && (
            <p className={styles.video_synopsis}>{video.description}</p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default VideoSelector;