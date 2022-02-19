import React, { useState } from "react";
import { Link } from "react-router-dom";

import styles from "../css/RowSlider.module.css";
import Preview from "./Preview";

const RowSlider = ({ lectures, context }) => {
  const CONTENT_IN_PAGE = 6;
  const LAST_PAGE_RATIO = lectures.length / CONTENT_IN_PAGE;
  const MAXIMUM_PAGE = Math.ceil(LAST_PAGE_RATIO) - 1;

  const [pagination, setPagination] = useState(0);
  const [rowHovered, setRowHovered] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const onPrevClick = () => setPagination((current) => current - 1);
  const onNextClick = () => setPagination((current) => current + 1);
  const onSliderMove = () => setRowHovered(true);
  const onSliderLeave = () => setRowHovered(false);
  const onLinkMove = () => setLinkHovered(true);
  const onLinkLeave = () => setLinkHovered(false);
  return (
    <div
      className={styles.rowSlider}
      onMouseMove={onSliderMove}
      onMouseLeave={onSliderLeave}
    >
      <h2 className={styles.rowHeader}>
        <Link
          to=""
          className={styles.rowLink}
          onMouseMove={onLinkMove}
          onMouseLeave={onLinkLeave}
        >
          <div className={styles.rowTitle}>{context}</div>
          <div className={styles.arrow}>
            <div
              className={`${styles.arrowText} ${linkHovered && styles.hovered}`}
            >
              모두 보기
            </div>
            {rowHovered && (
              <div
                className={`fas fa-chevron-right ${styles.arrowIcon} ${
                  linkHovered && styles.hovered
                }`}
              ></div>
            )}
          </div>
        </Link>
      </h2>
      <div className={styles.rowContainer}>
        <div className={styles.slider}>
          {pagination !== 0 && (
            <span className={styles.handlePrev} onClick={onPrevClick}>
              prev
            </span>
          )}
          <ul className={styles.pagination_indicator}></ul>
          <div className={styles.sliderMask}>
            <div
              className={styles.content}
              style={{
                transform: `translateX(-${
                  100 *
                  (pagination === MAXIMUM_PAGE
                    ? LAST_PAGE_RATIO - 1
                    : pagination)
                }%)`,
              }}
            >
              {lectures.map((lecture) => {
                const props = {
                  className: styles.item,
                  id: lecture.id,
                  title: lecture.title,
                  thumbnailUrl: lecture.thumbnailUrl,
                  topics: lecture.topics,
                };
                return <Preview {...props} key={lecture.id} />;
              })}
            </div>
          </div>
          {pagination !== MAXIMUM_PAGE && (
            <span className={styles.handleNext} onClick={onNextClick}>
              next
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default RowSlider;
