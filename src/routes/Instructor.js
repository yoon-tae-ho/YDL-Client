import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Footer from "../components/Footer";
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
  const [error, setError] = useState(null);
  const [target, setTarget] = useState(null);

  const { fetchNextPage, hasNextPage, data } = useInfiniteQuery(
    ["lectures", "instructor", id],
    ({ pageParam = 1 }) => getLecturesOfInstructor(id, pageParam),
    {
      getNextPageParam: (lastPage, pages) =>
        lastPage.isLast ? undefined : lastPage.nextPage,
      onSuccess: (data) => {
        const lastPage = data.pages[data.pages.length - 1];
        if (lastPage.isError) {
          return setError(true);
        }
      },
      onError: () => setError(true),
    }
  );

  // lectures와 instructorName에 data를 채워넣음.
  useEffect(() => {
    if (!data) return;

    let newLectures = [];
    data.pages.forEach((page, i) => {
      // first page
      if (i === 0) {
        setInstructorName(page.result?.name);
      }
      if (!!page.result?.lectures)
        newLectures = [...newLectures, ...page.result.lectures];
    });
    setLectures(newLectures);
  }, [data]);

  // id regex validation
  useEffect(() => {
    const regex = new RegExp(process.env.REACT_APP_MONGO_REGEX_FORMAT);
    if (!regex.test(id)) {
      setError(true);
    }
  }, [id]);

  useIntersectionObserver({
    root: null,
    target: target,
    onIntersect: () => {
      if (hasNextPage) fetchNextPage();
    },
  });

  return (
    <>
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
                ref={
                  index === 5 * (data?.pages?.length - 1) + 4 ? setTarget : null
                }
              >
                <RowSlider lectures={lectureChunk} />
              </div>
            ))}
          </div>
          {(hasNextPage || !data) && <RowLoading header={true} />}
        </main>
      )}
      <Footer />
    </>
  );
};

export default Topic;
