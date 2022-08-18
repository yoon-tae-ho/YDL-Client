import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import styles from "../css/Watch.module.css";
import NotFound from "../components/NotFound";
import UserContext from "../contexts/UserContext";
import { putView } from "../controllers/userController";
import { getVideoInfo } from "../controllers/lectureController";
import CircleLoading from "../components/CircleLoading";
import YoutubePlayer from "../components/YoutubePlayer";
import YalePlayer from "../components/YalePlayer";

const INTERVAL_TIME = 5000; // 몇 초에 한 번씩 putViewed를 호출하는지.

const Watch = () => {
  const { loggedIn, user, setUser } = useContext(UserContext);
  const { id } = useParams();

  const [viewedLoading, setViewedLoading] = useState(true);
  const [error, setError] = useState(false);
  const [viewedTime, setViewedTime] = useState(0);
  const [viewedDuration, setViewedDuration] = useState(-1);

  const { isLoading: queryLoading, data } = useQuery(
    ["watching", id],
    () => getVideoInfo(id),
    {
      onSuccess: (data) => {
        const { isError } = data;
        if (isError) {
          return setError(true);
        }
      },
    }
  );

  const isLoading = viewedLoading || queryLoading;

  const putViewed = async (time = 0, duration = 0) => {
    if (!loggedIn) return;
    const { status, newViewed } = await putView(id, time, duration);
    if (status === 404) {
      return setError(true);
    }
    setUser((user) => ({ ...user, viewed: newViewed }));
  };

  const getVideoPlayer = (player) => {
    const commonProps = {
      videoId: id,
      wrapperClass: styles.videoFrame,
      loggedIn,
      INTERVAL_TIME,
      viewedTime,
      viewedDuration,
      belongIn: data.videoObj?.belongIn,
      putViewed,
    };

    switch (player) {
      case process.env.REACT_APP_YOUTUBE_PLAYER:
        const youtubeProps = {
          ...commonProps,
          embededCode: data.videoObj?.embededCode,
        };
        return <YoutubePlayer {...youtubeProps} />;

      case process.env.REACT_APP_YALE_PLAYER:
        const yaleProps = {
          ...commonProps,
          videoSrc: data.videoObj?.videoSrc,
          videoType: data.videoObj?.videoType,
          trackSrc: data.videoObj?.trackSrc,
          trackKind: data.videoObj?.trackKind,
          trackSrclang: data.videoObj?.trackSrclang,
          thumbnailUrl: data.videoObj?.thumbnailUrl,
        };
        return <YalePlayer {...yaleProps} />;

      default:
        return null;
    }
  };

  // 시청 기록이 있다면 time을 가져옴.
  useEffect(() => {
    if (!loggedIn) return setViewedLoading(false);

    let index;
    let aView;
    aView = user.viewed.find((aView) => {
      index = aView.videos.findIndex(
        (video) => String(video.videoId) === String(id)
      );
      return index !== -1;
    });

    if (!!aView) {
      const { time, duration } = aView.videos[index];
      setViewedTime(time);
      setViewedDuration(duration);
    }
    setViewedLoading(false);
  }, [loggedIn, id]);

  return (
    <>
      {error ? (
        <NotFound />
      ) : (
        <main className={styles.main}>
          {isLoading ? (
            <CircleLoading />
          ) : (
            getVideoPlayer(data.videoObj?.player)
          )}
        </main>
      )}
    </>
  );
};

export default Watch;
