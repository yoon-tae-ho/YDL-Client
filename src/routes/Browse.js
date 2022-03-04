import React, { useEffect, useRef, useState } from "react";

import styles from "../css/Browse.module.css";
import Header from "../components/Header";
import RowSlider from "../components/RowSlider";
import RowLoading from "../components/RowLoading";
import { useIntersectionObserver } from "../hooks";

// netflix
// initial number 3.
// maximum number 38.

const requestInitial = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/topics/initial`,
      {
        credentials: "include",
      }
    );

    // error process
    if (response.status === 404) {
      return;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const requestRandom = async (excepts) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/topics/more`,
      {
        headers: {
          excepts: JSON.stringify(excepts),
        },
      }
    );

    // error process
    if (response.status === 404) {
      return;
    }

    const { result, ended } = await response.json();
    return { result, ended };
  } catch (error) {
    console.log(error);
  }
};

const Browse = () => {
  const MAX_MORE = 7;
  const [more, setMore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [ended, setEnded] = useState(false);
  const [topicArr, setTopicArr] = useState([]);
  const [error, setError] = useState(false);
  const targetRef = useRef();

  const onIntersect = async () => {
    if (topicArr.length > 0 && !loading && !ended) {
      setLoading(true);
      const { result, ended } = await requestRandom(
        topicArr.map((topic) => topic._id)
      );
      // error process
      if (!result) {
        setError(true);
        return setLoading(false);
      }
      setTopicArr((current) => [...current, ...result]);
      setLoading(false);
      setMore((current) => current + 1);
      if (ended || more >= MAX_MORE) {
        setEnded(ended);
      }
    }
  };

  useIntersectionObserver({
    root: null,
    target: targetRef.current,
    onIntersect,
  });

  useEffect(() => {
    requestInitial(setTopicArr, setError, setLoading).then((data) => {
      // error process
      if (!data) {
        setError(true);
        return setLoading(false);
      }
      setTopicArr(data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Header />
      <main className={styles.browseMain}>
        <div className={styles.sliders}>
          {topicArr.length !== 0 &&
            topicArr.map((topic, index) => (
              <div
                key={topic._id}
                ref={index === 5 * more + 4 ? targetRef : null}
              >
                <RowSlider lectures={topic.lectures} context={topic.name} />
              </div>
            ))}
        </div>
        {ended ? null : <RowLoading header={true} />}
      </main>
    </>
  );
};

export default Browse;
