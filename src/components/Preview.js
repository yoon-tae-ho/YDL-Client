import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../css/Preview.module.css";

const Preview = ({ className, id, title, thumbnailUrl, topics }) => {
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
  return (
    <div className={className}>
      <Link
        className={styles.link}
        to={`/browse/${id}`}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <img
          className={styles.thumbnail}
          src={thumbnailUrl}
          alt={process.env.THUMBNAIL_ALT}
          width={160}
          height={90}
        />
        <div className={styles.info_container}>
          <h2 className={styles.title}>{title}</h2>
          {hovered && (
            <ul className={styles.topics}>
              {topics.map((topic) => (
                <li key={topic._id} className={styles.topic}>
                  {topic.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </Link>
    </div>
  );
};

export default Preview;
