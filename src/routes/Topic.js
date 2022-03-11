import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import Header from "../components/Header";
import NotFound from "../components/NotFound";
import RowLoading from "../components/RowLoading";
import RowSlider from "../components/RowSlider";
import { getLecturesOfTopic } from "../controllers/lectureController";
import styles from "../css/Topic.module.css";
import { useIntersectionObserver } from "../hooks";

const divideLectures = (lectures) => {
  const result = [];
  const count = Math.floor((lectures.length - 1) / 6) + 1;
  const SCALE = 6;

  for (let i = 0; i < count; ++i) {
    result.push(
      lectures.slice(i * SCALE, i === count - 1 ? undefined : (i + 1) * SCALE)
    );
  }

  return result;
};

const Topic = () => {
  const { id } = useParams();
  const [lectures, setLectures] = useState([]);
  const [topicName, setTopicName] = useState("");
  const [topicId, setTopicId] = useState("");
  const [fetchIndex, setFetchIndex] = useState(0);
  const [error, setError] = useState(null);
  const [ended, setEnded] = useState(false);
  const [target, setTarget] = useState(null);

  useEffect(() => {
    // id regex validation
    const regex = new RegExp(process.env.REACT_APP_MONGO_REGEX_FORMAT);
    if (!regex.test(id)) {
      setError(true);
    }

    // initial request
    if (!error && !ended) {
      requestLectures();
    }
  }, [id]);

  const requestLectures = async () => {
    const result = await getLecturesOfTopic(id, fetchIndex);

    // error process
    if (!result) {
      return setEnded(true);
    }

    const { topic, ended } = result;

    if (fetchIndex === 0) {
      setTopicName(topic.name);
      setTopicId(topic._id);
    }

    setLectures((current) => [...current, ...topic.lectures]);
    setFetchIndex((current) => current + 1);
    if (ended) {
      setEnded(true);
    }
  };

  const onIntersect = () => {
    if (lectures.length > 0 && !ended) {
      requestLectures();
    }
  };

  useIntersectionObserver({
    root: null,
    target: target,
    onIntersect,
  });

  return (
    <>
      <Header />
      <header className={styles.header}>
        <h1 className={styles.title}>{topicName}</h1>
      </header>
      {error ? (
        <NotFound />
      ) : (
        <main className={styles.main}>
          <div className={styles.sliders}>
            {divideLectures(lectures).map((lectureChunk, index) => (
              <div
                key={`lecture_chunk_${index}`}
                ref={index === 5 * (fetchIndex - 1) + 4 ? setTarget : null}
              >
                <RowSlider lectures={lectureChunk} />
              </div>
            ))}
          </div>
          {ended ? null : <RowLoading header={true} />}
        </main>
      )}
    </>
  );
};

export default Topic;
