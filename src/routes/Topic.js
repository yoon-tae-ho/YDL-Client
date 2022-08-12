import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";

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

const allowedNonRegex = [
  process.env.REACT_APP_CONTINUE_WATCHING,
  process.env.REACT_APP_MY_LIST,
];

const Topic = () => {
  const { loggedIn, user } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [lectures, setLectures] = useState([]);
  const [topicName, setTopicName] = useState("");
  const [error, setError] = useState(null);
  const [target, setTarget] = useState(null);

  const { fetchNextPage, hasNextPage, data } = useInfiniteQuery(
    ["lectures", "topic", id, loggedIn],
    ({ pageParam = 1 }) => getLecturesOfTopic(id, pageParam),
    {
      getNextPageParam: (lastPage, pages) =>
        lastPage.isLast ? undefined : lastPage.nextPage,
      onSuccess: (data) => {
        const lastPage = data.pages[data.pages.length - 1];
        // error process
        if (lastPage.isError) {
          switch (lastPage.status) {
            case 401:
              return navigate("/login");

            case 404:
              if (data.pages.length === 1) return setError(true);
              break;

            default:
              return;
          }
        }
      },
      onError: () => setError(true),
      // user에 의해 변할 수 있는 my-list와 continue-watching은
      // 페이지에 들어올 때 refetch를 해줘서 최신의 상태를 유지한다.
      staleTime: allowedNonRegex.includes(id) ? 0 : Infinity,
      refetchOnMount: allowedNonRegex.includes(id) ? true : false,
    }
  );

  useIntersectionObserver({
    root: null,
    target: target,
    onIntersect: () => {
      if (hasNextPage) fetchNextPage();
    },
  });

  // lectures와 topicName에 data를 채워넣음.
  useEffect(() => {
    if (!data) return;

    let newLectures = [];
    data.pages.forEach((page, i) => {
      // first page
      if (i === 0) {
        setTopicName(page.result?.name);
      }
      if (!!page.result?.lectures)
        newLectures = [...newLectures, ...page.result.lectures];
    });
    setLectures(newLectures);
  }, [data]);

  // user data가 필요한 경우에 loggedIn 상태가 아니라면 login page로 보냄.
  useEffect(() => {
    const isIncluded = allowedNonRegex.includes(id);
    if (isIncluded && !loggedIn) return navigate("/login");
  }, [id, loggedIn]);

  // my-list에서 lecture를 제거했을 때 화면에 바로 적용하기 위한 코드.
  useEffect(() => {
    if (
      !loggedIn ||
      id !== process.env.REACT_APP_MY_LIST ||
      lectures.length === 0
    ) {
      return;
    }

    // login 되어있고 my-list 토픽을 선택했고 lectures가 있을 때.
    let i;
    for (i = 0; i < lectures.length; ++i) {
      if (!user.booked.includes(lectures[i]._id)) {
        break;
      }
    }

    if (i < lectures.length) {
      setLectures((current) => current.filter((_, index) => index !== i));
    }
  }, [id, loggedIn, user?.booked, lectures]);

  return (
    <>
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
                ref={
                  index === 5 * (data?.pages?.length - 1) + 4 ? setTarget : null
                }
              >
                <RowSlider lectures={lectureChunk} topicId={id} />
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
