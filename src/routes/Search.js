import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Header from "../components/Header";
import SearchContext from "../contexts/SearchContext";
import NotFound from "../components/NotFound";
import RowSlider from "../components/RowSlider";
import {
  divideLectures,
  searchLectures,
} from "../controllers/lectureController";
import styles from "../css/Search.module.css";
import { useIntersectionObserver } from "../hooks";

const Search = () => {
  const { isSearching, setIsSearching, text, setText } =
    useContext(SearchContext);
  const [searchParams, _] = useSearchParams();

  const [lectures, setLectures] = useState([]);
  const [fetchIndex, setFetchIndex] = useState(0);
  const [error, setError] = useState(null);
  const [ended, setEnded] = useState(false);
  const [target, setTarget] = useState(null);

  const requestLectures = async (keyword, index) => {
    if (!keyword) {
      return;
    }

    let excepts = [];
    if (index !== 0) {
      excepts = lectures.map((lecture) => lecture._id);
    }

    const { status, data } = await searchLectures(keyword, excepts);

    // bad request (keyword === "")
    if (status === 400) {
      return;
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

    if (data.ended) {
      setEnded(true);
    }
    return data.lectures;
  };

  const onIntersect = () => {
    if (lectures.length > 0 && !ended) {
      requestLectures(text, fetchIndex).then((newLectures) => {
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
    const keyword = searchParams.get("q");
    // set SearchContext
    if (!isSearching) {
      setIsSearching(true);
    }
    setText(keyword);

    // initial request
    setLectures([]);
    setFetchIndex(0);
    setError(false);
    setEnded(false);
    setTarget(null);
    requestLectures(keyword, 0).then((newLectures) => {
      setLectures(newLectures);
      setFetchIndex(1);
    });
  }, [searchParams]);

  return (
    <>
      <Header />
      <header className={styles.header}>
        <small className={styles.header_text}>다음과 관련된 강의: </small>
        <h1 className={styles.title}>{text}</h1>
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
        </main>
      )}
    </>
  );
};

export default Search;
