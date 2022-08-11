import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import SearchContext from "../contexts/SearchContext";
import NotFound from "../components/NotFound";
import RowSlider from "../components/RowSlider";
import {
  divideLectures,
  searchLectures,
} from "../controllers/lectureController";
import styles from "../css/Search.module.css";
import { useIntersectionObserver } from "../hooks";
import Footer from "../components/Footer";

const Search = () => {
  const { isSearching, setIsSearching, text, setText } =
    useContext(SearchContext);
  const [searchParams, _] = useSearchParams();

  const [lectures, setLectures] = useState([]);
  const [fetchIndex, setFetchIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ended, setEnded] = useState(false);
  const [target, setTarget] = useState(null);

  const requestLectures = async (keyword, index) => {
    if (!keyword) {
      return;
    }

    setLoading(true);

    let excepts = [];
    if (index !== 0) {
      excepts = lectures.map((lecture) => lecture._id);
    }

    const { status, data } = await searchLectures(keyword, excepts);

    // bad request (keyword === "")
    if (status === 400) {
      return setLoading(false);
    }

    // error process
    if (status === 404) {
      setEnded(true);
      setLoading(false);
      if (index === 0) {
        return setError(true);
      }
    }

    if (data.ended) {
      setEnded(true);
    }
    setLoading(false);
    setError(false);
    return data.lectures;
  };

  const onIntersect = () => {
    if (lectures.length > 0 && !ended) {
      requestLectures(text, fetchIndex).then((newLectures) => {
        if (newLectures) {
          setLectures((current) => [...current, ...newLectures]);
          setFetchIndex((current) => current + 1);
        }
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

    // state initilize
    setLectures([]);
    setFetchIndex(0);
    setLoading(true);
    setError(null);
    setEnded(false);
    setTarget(null);

    // initial request
    requestLectures(keyword, 0).then((newLectures) => {
      if (newLectures) {
        setLectures(newLectures);
        setFetchIndex(1);
      }
    });
  }, [searchParams]);

  return (
    <>
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
      {!loading && <Footer />}
    </>
  );
};

export default Search;
