import React, { useState } from "react";
import { Link } from "react-router-dom";

import styles from "../css/RowSlider.module.css";
import Preview from "./Preview";

const getPreviews = (lectures, setPreviewHovered) => {
  const result = lectures.map((lecture) => {
    const props = {
      className: styles.item,
      id: lecture.id,
      title: lecture.title,
      thumbnailUrl: lecture.thumbnailUrl,
      topics: lecture.topics,
      setPreviewHovered,
    };
    return <Preview {...props} key={lecture.id} />;
  });
  return result;
};

const getPaginationIndicator = (currentPage, MAXIMUM_PAGE) => {
  const result = [];
  for (let i = 0; i <= MAXIMUM_PAGE; ++i) {
    result.push(
      <li
        className={i === currentPage ? styles.active : null}
        key={`PI${i}`}
      ></li>
    );
  }
  return result;
};

const RowSlider = ({ lectures, context }) => {
  const CONTENT_IN_PAGE = 6;
  const LAST_PAGE_RATIO = lectures.length / CONTENT_IN_PAGE;
  const MAXIMUM_PAGE = Math.ceil(LAST_PAGE_RATIO) - 1;

  const [pagination, setPagination] = useState(0);
  const [rowHovered, setRowHovered] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [sliderHovered, setSliderHovered] = useState(false);
  // setPreviewHovered function triggered by Preview component.
  const [previewHovered, setPreviewHovered] = useState(false);
  const onPrevClick = () => setPagination((current) => current - 1);
  const onNextClick = () => setPagination((current) => current + 1);
  const onRowMove = () => setRowHovered(true);
  const onRowLeave = () => setRowHovered(false);
  const onLinkMove = () => setLinkHovered(true);
  const onLinkLeave = () => setLinkHovered(false);
  const onSliderMove = () => setSliderHovered(true);
  const onSliderLeave = () => setSliderHovered(false);
  return (
    <div
      className={styles.rowSlider}
      onMouseMove={onRowMove}
      onMouseLeave={onRowLeave}
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
              className={`${styles.arrowText} ${
                linkHovered && styles.arrowHovered
              }`}
            >
              모두 보기
            </div>
            {rowHovered && (
              <div
                className={`fas fa-chevron-right ${styles.arrowIcon} ${
                  linkHovered && styles.arrowHovered
                }`}
              ></div>
            )}
          </div>
        </Link>
      </h2>
      <div className={styles.rowContainer}>
        <div
          className={styles.slider}
          onMouseMove={onSliderMove}
          onMouseLeave={onSliderLeave}
        >
          {pagination !== 0 && (
            <span className={styles.handlePrev} onClick={onPrevClick}>
              {sliderHovered && (
                <i
                  className={`fas fa-chevron-left ${styles.handlePrevIcon}`}
                ></i>
              )}
            </span>
          )}
          <ul className={styles.pagination_indicator}>
            {sliderHovered && getPaginationIndicator(pagination, MAXIMUM_PAGE)}
          </ul>
          <div className={styles.sliderMask}>
            <div
              className={`content ${styles.content} ${
                previewHovered ? styles.previewHovered : null
              }`}
              style={{
                transform: `translateX(-${
                  100 *
                  (pagination === MAXIMUM_PAGE
                    ? LAST_PAGE_RATIO - 1
                    : pagination)
                }%)`,
              }}
            >
              {getPreviews(lectures, setPreviewHovered)}
            </div>
          </div>
          {pagination !== MAXIMUM_PAGE && (
            <span className={styles.handleNext} onClick={onNextClick}>
              {sliderHovered && (
                <i
                  className={`fas fa-chevron-right ${styles.handleNextIcon}`}
                ></i>
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default RowSlider;
