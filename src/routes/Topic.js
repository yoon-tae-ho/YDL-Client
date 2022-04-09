import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";

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
  const { loggedIn, user } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [lectures, setLectures] = useState([]);
  const [topicName, setTopicName] = useState("");
  const [topicId, setTopicId] = useState("");
  const [fetchIndex, setFetchIndex] = useState(0);
  const [error, setError] = useState(null);
  const [ended, setEnded] = useState(false);
  const [target, setTarget] = useState(null);

  const requestLectures = async (index) => {
    const { status, data } = await getLecturesOfTopic(id, index);

    // unAuthorized
    if (status === 401) {
      return navigate("/login");
    }

    // error process
    if (status === 404) {
      if (index === 0) {
        setEnded(true);
        return setError(true);
      } else {
        return setEnded(true);
      }
    }

    const { topic, ended } = data;

    setTopicName(topic.name);
    setTopicId(topic._id);

    if (ended) {
      setEnded(true);
    }
    return topic.lectures;
  };

  const onIntersect = () => {
    if (lectures.length > 0 && !ended) {
      requestLectures(fetchIndex).then((newLectures) => {
        setLectures((current) => [...current, ...newLectures]);
        setFetchIndex((current) => current + 1);
      });
    }
  };

  useIntersectionObserver({
    root: null,
    target: target,
    onIntersect,
  });

  useEffect(() => {
    const allowedNonRegex = [
      process.env.REACT_APP_CONTINUE_WATCHING,
      process.env.REACT_APP_MY_LIST,
    ];
    const isIncluded = allowedNonRegex.includes(id);
    if (isIncluded && !loggedIn) {
      return navigate("/login");
    }

    // initial request
    setError(false);
    setEnded(false);
    setFetchIndex(0);
    setLectures([]);
    setTopicName("");
    setTopicId("");
    setTarget(null);
    requestLectures(0).then((newLectures) => {
      setLectures(newLectures);
      setFetchIndex(1);
    });
  }, [id, loggedIn]);

  useEffect(() => {
    if (
      !loggedIn ||
      id !== process.env.REACT_APP_MY_LIST ||
      lectures.length === 0
    ) {
      return;
    }

    let i;
    for (i = 0; i < lectures.length; ++i) {
      if (!user.booked.includes(lectures[i]._id)) {
        break;
      }
    }

    if (i < lectures.length) {
      setLectures((current) => current.filter((_, index) => index !== i));
    }
  }, [id, loggedIn, user?.booked]);

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
                <RowSlider lectures={lectureChunk} topicId={topicId} />
              </div>
            ))}
          </div>
          {!ended && <RowLoading header={true} />}
        </main>
      )}
      <Footer />
    </>
  );
};

export default Topic;
