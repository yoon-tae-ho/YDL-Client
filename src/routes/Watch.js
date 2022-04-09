import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";

import styles from "../css/Watch.module.css";
import Header from "../components/Header";
import NotFound from "../components/NotFound";
import UserContext from "../contexts/UserContext";
import { getVideoInfo, putView } from "../controllers/userController";
import VideoLoading from "../components/VideoLoading";

const putRequest = async (id, target, setUser, setError) => {
  const duration = Math.floor(target.getDuration());
  const time = Math.floor(target.getCurrentTime());
  const { status, newViewed } = await putView(id, time, duration);
  if (status === 404) {
    return setError(true);
  }
  setUser((user) => ({ ...user, viewed: newViewed }));
};

const Watch = () => {
  const { loggedIn, user, setUser } = useContext(UserContext);
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [src, setSrc] = useState("");
  const [allow, setAllow] = useState(
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
  );
  const [player, setPlayer] = useState("");

  // Youtube Only
  const [code, setCode] = useState("");
  const [opts, setOpts] = useState({});
  const [intervalId, setIntervalId] = useState("");

  const onYoutubeReady = (event) => {
    if (loggedIn) {
      putRequest(id, event.target, setUser, setError);
    }
  };

  const onYoutubePlay = (event) => {
    if (!loggedIn) {
      return;
    }

    if (!intervalId) {
      const tempId = setInterval(() => {
        putRequest(id, event.target, setUser, setError);
      }, 5000);
      setIntervalId(tempId);
    }
  };

  const onYoutubePause = (event) => {
    if (!loggedIn) {
      return;
    }

    putRequest(id, event.target, setUser, setError);

    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId("");
    }
  };

  const onYoutubeEnd = (event) => {};

  const setIframe = (code, player, time = 0) => {
    switch (player) {
      case process.env.REACT_APP_YOUTUBE_PLAYER:
        setOpts({
          width: "100%",
          height: "100%",
          playerVars: {
            // https://developers.google.com/youtube/player_parameters
            start: time,
            autoplay: 1,
            controls: 1,
            enablejsapi: 1,
            origin: window.location.origin,
            rel: 1,
          },
        });
        setCode(code);
        break;

      default:
        break;
    }
    setPlayer(player);
  };

  // clear interval
  useEffect(() => {
    return () => {
      if (intervalId) {
        clearTimeout(intervalId);
        setIntervalId("");
      }
    };
  }, [intervalId]);

  // initial setting
  useEffect(() => {
    let index;
    let aView;
    if (loggedIn) {
      aView = user.viewed.find((aView) => {
        index = aView.videos.findIndex(
          (video) => String(video.videoId) === String(id)
        );
        return index !== -1;
      });
    }

    if (!loggedIn || !aView) {
      // did not watch it
      getVideoInfo(id).then(({ status, data }) => {
        if (status === 404) {
          return setError(true);
        }

        const { embededCode, player } = data;
        setIframe(embededCode, player);
      });
    } else {
      const { videoCode, player, time } = aView.videos[index];
      setIframe(videoCode, player, time);
    }

    setLoading(false);
  }, [loggedIn, id]);

  return (
    <>
      <Header />
      {error ? (
        <NotFound />
      ) : (
        <main className={styles.main}>
          {loading ? (
            <VideoLoading />
          ) : player === process.env.REACT_APP_YOUTUBE_PLAYER ? (
            <YouTube
              id="player"
              containerClassName={styles.videoFrame}
              videoId={code}
              opts={opts}
              onReady={onYoutubeReady}
              onPlay={onYoutubePlay}
              onPause={onYoutubePause}
              onEnd={onYoutubeEnd}
            />
          ) : (
            <iframe
              id="player"
              className={styles.videoFrame}
              title="Lecture Video"
              src={src}
              allow={allow}
            ></iframe>
          )}
        </main>
      )}
    </>
  );
};

export default Watch;
