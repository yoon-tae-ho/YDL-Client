import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";

import Header from "../components/Header";
import NotFound from "../components/NotFound";
import RowLoading from "../components/RowLoading";
import RowSlider from "../components/RowSlider";
import {
  getLecturesOfInstructor,
  divideLectures,
} from "../controllers/lectureController";
import styles from "../css/Instructor.module.css";
import { useIntersectionObserver } from "../hooks";

const Topic = () => {
  const { id } = useParams();
  const [lectures, setLectures] = useState([]);
  const [instructorName, setInstructorName] = useState("");
  const [instructorId, setInstructorId] = useState("");
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
    const result = await getLecturesOfInstructor(id, fetchIndex);

    // error process
    if (!result) {
      return setEnded(true);
    }

    const { instructor, ended } = result;

    if (fetchIndex === 0) {
      setInstructorName(instructor.name);
      setInstructorId(instructor._id);
    }

    setLectures((current) => [...current, ...instructor.lectures]);
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
        <h1 className={styles.title}>{instructorName}</h1>
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
      <Footer />
    </>
  );
};

export default Topic;
