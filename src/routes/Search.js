import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";

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
import CircleLoading from "../components/CircleLoading";

const Search = () => {
  const { setIsSearching, text, setText } = useContext(SearchContext);
  const [searchParams, _] = useSearchParams();

  const [lectures, setLectures] = useState([]);
  const [error, setError] = useState(null);
  const [target, setTarget] = useState(null);

  const { fetchNextPage, hasNextPage, data } = useInfiniteQuery(
    ["lectures", "search", text],
    ({ pageParam = 1 }) =>
      searchLectures(
        text,
        lectures.map((lecture) => lecture._id),
        pageParam
      ),
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

  useIntersectionObserver({
    root: null,
    target: target,
    onIntersect: () => {
      if (hasNextPage) fetchNextPage();
    },
  });

  // search param이 바뀌어도 search page에서 벗어나지 않기 때문에
  // state들이 초기화되지 않음. 따라서 state initialize가 필요함.
  useEffect(() => {
    const keyword = searchParams.get("q");

    setLectures([]);
    setError(null);
    setTarget(null);
    window.scroll(0, 0);

    setIsSearching(true);
    setText(keyword);
  }, [searchParams]);

  // lectures에 data를 채워넣음.
  useEffect(() => {
    if (!data) return;

    let newLectures = [];
    data.pages.forEach((page, i) => {
      if (!!page.result) newLectures = [...newLectures, ...page.result];
    });
    setLectures(newLectures);
  }, [data]);

  return (
    <>
      <header className={styles.header}>
        <small className={styles.header_text}>다음과 관련된 강의: </small>
        <h1 className={styles.title}>{text}</h1>
      </header>
      <main className={styles.main}>
        {error || (!!data && !hasNextPage && lectures.length === 0) ? (
          <NotFound />
        ) : (
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
            {(hasNextPage || !data) && <CircleLoading />}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Search;
