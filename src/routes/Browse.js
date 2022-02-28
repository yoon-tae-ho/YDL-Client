import React, { useEffect, useState } from "react";

import styles from "../css/Browse.module.css";
import Header from "../components/Header";
import RowSlider from "../components/RowSlider";
import RowLoading from "../components/RowLoading";
import NotFound from "../components/NotFound";

const getInitial = async (setTopicArr, setError) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/lectures/initial`
    );

    // error process
    if (response.status === 404) {
      return setError(true);
    }

    const data = await response.json();
    setTopicArr(data);
  } catch (error) {
    console.log(error);
  }
};

const Browse = () => {
  const [ended, setEnded] = useState(false);
  const [topicArr, setTopicArr] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    getInitial(setTopicArr, setError);
  }, []);

  return (
    <>
      <Header />
      {error ? (
        <NotFound />
      ) : (
        <div className={styles.browseBody}>
          <main>
            {topicArr.map((topic) => (
              <RowSlider
                key={topic._id}
                lectures={topic.lectures}
                context={topic.name}
              />
            ))}
          </main>
        </div>
      )}
    </>
  );
};

export default Browse;
