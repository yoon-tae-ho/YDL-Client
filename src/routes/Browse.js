import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import styles from "../css/Browse.module.css";
import RowSlider from "../components/RowSlider";
import RowLoading from "../components/RowLoading";
import { useIntersectionObserver } from "../hooks";
import Footer from "../components/Footer";
import { browseLectures } from "../controllers/lectureController";

const Browse = () => {
  const [target, setTarget] = useState(null);
  const [maxIndex, setMaxIndex] = useState(0);
  const [isContainedArr, setIsContainedArr] = useState([]);

  const { fetchNextPage, hasNextPage, data } = useInfiniteQuery(
    ["browse"],
    ({ pageParam = 1 }) => browseLectures(pageParam, maxIndex, isContainedArr),
    {
      getNextPageParam: (lastPage, pages) =>
        lastPage.isLast ? undefined : lastPage.nextPage,
    }
  );

  // maxIndex, isContainedArr에 데이터 넣기
  useEffect(() => {
    if (!data) return;

    const arr = new Array(data.pages[0].numOfTopics + 1);
    for (let i = 0; i < data.pages[0].numOfTopics + 1; ++i) arr[i] = false;

    data.pages.forEach((page, i) => {
      // first page
      if (i === 0 && !!page.numOfTopics) setMaxIndex(page.numOfTopics);
      page.result?.forEach((topic) => (arr[topic.index] = true));
    });

    setIsContainedArr(arr);
  }, [data]);

  useIntersectionObserver({
    root: null,
    target: target,
    onIntersect: () => {
      if (hasNextPage) fetchNextPage();
    },
  });

  return (
    <>
      <main className={styles.browseMain}>
        <div className={styles.sliders}>
          {!!data &&
            data.pages?.map((page, i) =>
              page.result?.map((topic, j) => (
                <div
                  key={topic._id}
                  ref={
                    i === data.pages.length - 1
                      ? j === page.result.length - 2
                        ? setTarget
                        : undefined
                      : undefined
                  }
                >
                  <RowSlider
                    lectures={topic.lectures}
                    context={topic.name}
                    topicId={topic._id}
                  />
                </div>
              ))
            )}
        </div>
        {(hasNextPage || !data) && <RowLoading header={true} />}
      </main>
      <Footer />
    </>
  );
};

export default Browse;
