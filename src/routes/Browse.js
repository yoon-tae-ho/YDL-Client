import React, { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import styles from "../css/Browse.module.css";
import Header from "../components/Header";
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
      onSuccess: (data) => {
        // first page
        if (data.pages.length === 1) {
          setMaxIndex(data.pages[0].numOfTopics);
          const arr = new Array(data.pages[0].numOfTopics + 1);
          for (let i = 0; i < data.pages[0].numOfTopics + 1; ++i)
            arr[i] = false;
          setIsContainedArr(arr);
        }
        const newIsContainedArr = [...isContainedArr];
        data.pages[data.pages.length - 1].result.forEach(
          (topic) => (newIsContainedArr[topic.index] = true)
        );
      },
    }
  );

  useIntersectionObserver({
    root: null,
    target: target,
    onIntersect: () => {
      if (hasNextPage) fetchNextPage();
    },
  });

  return (
    <>
      <Header />
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
