import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import NotFound from "../components/NotFound";
import styles from "../css/Lecture.module.css";
import buttonStyles from "../css/Button.module.css";
import PlayButton from "../components/buttons/PlayButton";
import BookButton from "../components/buttons/BookButton";
import LikeButton from "../components/buttons/LikeButton";
import HateButton from "../components/buttons/HateButton";
import MoreButton from "../components/buttons/MoreButton";
import VideoSelector from "../components/VideoSelector";
import { getVideoPath } from "../controllers/lectureController";

const getTags = (type, tags, limit = tags.length) => {
  let result = [];
  const indicator = limit < tags.length ? limit : tags.length;
  for (let i = 0; i < indicator; ++i) {
    result.push(
      <span className={styles.tag_item} key={tags[i]._id}>
        <Link to={`/browse/${type}s/${tags[i]._id}`}>{` ${tags[i].name}${
          i === indicator - 1 ? "" : ","
        }`}</Link>
      </span>
    );
  }
  return result;
};

const getVideoSelectors = (videos, isExpanded) => {
  const result = [];
  for (
    let i = 0;
    i < (!isExpanded && videos.length > 10 ? 10 : videos.length);
    ++i
  ) {
    result.push(
      <VideoSelector
        video={videos[i]}
        index={i}
        path={getVideoPath(videos[i].player, videos[i].embededCode)}
        key={videos[i]._id}
      />
    );
  }
  return result;
};

const Lecture = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [lecture, setLecture] = useState(null);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [clamped, setClamped] = useState(true);

  // id regex validation
  useEffect(() => {
    const regex = new RegExp(process.env.REACT_APP_MONGO_REGEX_FORMAT);
    if (!regex.test(id)) {
      setError(true);
    }
  }, [id]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/lectures/${id}`)
      .then((response) => {
        if (response.status === 404) {
          // error process
          setError(true);
          setLoading(false);
          return;
        }
        return response.json();
      })
      .then((data) => {
        setLecture(data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const onBackBtnClick = () => {
    window.history.back();
  };

  const onDivideBtnClick = () => setExpanded((current) => !current);

  return (
    <div>
      {loading ? (
        "Loading..."
      ) : error ? (
        <NotFound />
      ) : (
        <div className={styles.lecture_container}>
          <img
            className={styles.background}
            src={lecture.thumbnailUrl}
            alt={process.env.REACT_APP_THUMBNAIL_ALT}
          />
          <div className={styles.lecture_preview}>
            <img
              className={styles.lecture_thumbnail}
              src={lecture.thumbnailUrl}
              alt={process.env.REACT_APP_THUMBNAIL_ALT}
            />
            <div className={styles.lecture_previewWrapper}></div>
            <button className={styles.back_button} onClick={onBackBtnClick}>
              <i className="fas fa-arrow-left fa-lg"></i>
            </button>
            <div className={styles.lecture_controls}>
              <PlayButton
                shape="rectangular"
                lectureId={id}
                firstVideo={lecture.videos[0]}
              />
              <BookButton lectureId={id} />
              <LikeButton lectureId={id} />
              <HateButton lectureId={id} />
            </div>
          </div>
          <div className={styles.lecture_info}>
            <div className={styles.lecture_metadata}>
              <div className={styles.metadata_left}>
                <h1 className={styles.lecture_title}>{lecture.title}</h1>
                <div className={styles.lecture_synopsis}>
                  <p
                    className={`${styles.lecture_description}${
                      clamped ? ` ${styles.clamped}` : ""
                    }`}
                  >
                    {lecture.description}
                  </p>
                  <MoreButton
                    clickHandler={() => setClamped((current) => !current)}
                  />
                </div>
              </div>
              <div className={styles.metadata_right}>
                <div className={styles.tag}>
                  <span className={styles.tag_label}>기관: </span>
                  <span
                    className={`${styles.tag_item} ${styles.tag_item_notLink}`}
                  >
                    {lecture.institute}
                  </span>
                </div>
                <div className={styles.tag}>
                  <span className={styles.tag_label}>교수:</span>
                  {getTags("instructor", lecture.instructors, 3)}
                  {lecture.instructors.length > 3 && (
                    <span className={styles.tag_more}>, 더 보기</span>
                  )}
                </div>
                <div className={styles.tag}>
                  <span className={styles.tag_label}>토픽:</span>
                  {getTags("topic", lecture.topics, 3)}
                </div>
              </div>
            </div>
            <div className={styles.video_selector}>
              <div className={styles.selector_header}>
                <h3 className={styles.selector_label}>회차</h3>
                <div className={styles.selector_length}>
                  {lecture.videos.length} 강
                </div>
              </div>
              <div className={styles.selector_container}>
                {getVideoSelectors(lecture.videos, expanded)}
                {lecture.videos.length > 10 && (
                  <div className={`${styles.section_devider}`}>
                    <button
                      className={`${buttonStyles.button} ${styles.divider_button}`}
                      onClick={onDivideBtnClick}
                    >
                      <i
                        className={`fas fa-${
                          expanded ? "chevron-up" : "chevron-down"
                        } ${styles.devider_icon}`}
                      ></i>
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className={styles.about_wrapper}>
              <h3 className={styles.about_header}>
                <strong>{lecture.title}</strong>
                {" 상세 정보"}
              </h3>
              <div className={styles.about_container}>
                <div className={styles.tag}>
                  <span className={styles.tag_label}>기관: </span>
                  <span
                    className={`${styles.tag_item} ${styles.tag_item_notLink}`}
                  >
                    {lecture.institute}
                  </span>
                </div>
                <div className={styles.tag}>
                  <span className={styles.tag_label}>교수:</span>
                  {getTags("instructor", lecture.instructors)}
                </div>
                <div className={styles.tag}>
                  <span className={styles.tag_label}>토픽:</span>
                  {getTags("topic", lecture.topics)}
                </div>
                <div className={styles.tag}>
                  <span className={styles.tag_label}>수강등급: </span>
                  <span
                    className={`${styles.tag_item} ${styles.tag_item_notLink}`}
                  >
                    {lecture.level}
                  </span>
                </div>
                <div className={styles.tag}>
                  <span className={styles.tag_label}>강의연도: </span>
                  <span
                    className={`${styles.tag_item} ${styles.tag_item_notLink}`}
                  >
                    {lecture.asTaughtIn}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lecture;
