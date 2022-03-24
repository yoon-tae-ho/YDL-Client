import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Header from "../components/Header";
import NotFound from "../components/NotFound";
import RowLoading from "../components/RowLoading";
import RowSlider from "../components/RowSlider";
import UserContext from "../contexts/UserContext";
import {
  getLecturesOfTopic,
  divideLectures,
} from "../controllers/lectureController";
import styles from "../css/Topic.module.css";
import { useIntersectionObserver } from "../hooks";

const Topic = () => {
  const { loggedIn } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [lectures, setLectures] = useState([]);
  const [topicName, setTopicName] = useState("");
  const [topicId, setTopicId] = useState("");
  const [fetchIndex, setFetchIndex] = useState(0);
  const [error, setError] = useState(null);
  const [ended, setEnded] = useState(false);
  const [target, setTarget] = useState(null);

  useEffect(() => {
    // const allowedNonRegex = [process.env.REACT_APP_CONTINUE_WATCHING];
    const isLoginRequired = id === process.env.REACT_APP_CONTINUE_WATCHING;
    if (isLoginRequired && !loggedIn) {
      navigate("/");
    }

    if (!error && !ended) {
      // initial request
      requestLectures();
    }
  }, [id]);

  const requestLectures = async () => {
    const { status, data } = await getLecturesOfTopic(id, fetchIndex);

    // unAuthorized
    if (status === 401) {
      return navigate("/");
    }

    // error process
    if (status === 404) {
      return setEnded(true);
    }

    const { topic, ended } = data;

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
