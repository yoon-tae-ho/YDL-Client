import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../css/Preview.module.css";

const Preview = ({ id, title, thumbnailUrl, topics }) => {
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
    <>
      <Link
        to={`/browse/${id}`}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <img
          src={thumbnailUrl}
          alt={process.env.THUMBNAIL_ALT}
          width={160}
          height={90}
        />
        <div>
          <h2>{title}</h2>
          {hovered ? (
            <ul>
              {topics.map((topic) => (
                <li key={topic._id}>{topic.name}</li>
              ))}
            </ul>
          ) : null}
        </div>
      </Link>
    </>
  );
};

export default Preview;
