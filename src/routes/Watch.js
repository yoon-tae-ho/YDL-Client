import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import YouTube from "react-youtube";

import styles from "../css/Watch.module.css";
import Header from "../components/Header";
import UserContext from "../contexts/UserContext";

const request = () => {};

const Watch = () => {
  const { loggedIn, user } = useContext(UserContext);
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [src, setSrc] = useState("");
  const [allow, setAllow] = useState(
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
  );
  const [player, setPlayer] = useState("");

  // Youtube Only
  const [code, setCode] = useState("");
  const [opts, setOpts] = useState({});
  const [intervalId, setIntervalId] = useState("");

  const onYoutubePlay = (event) => {
    if (!loggedIn) {
      return;
    }

    if (!intervalId) {
      const id = setInterval(() => {
        const time = Math.floor(event.target.getCurrentTime());
        request();
      }, 5000);
      setIntervalId(id);
    }
  };

  const onYoutubePause = (event) => {
    if (!loggedIn) {
      return;
    }

    const time = Math.floor(event.target.getCurrentTime());
    request();

    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId("");
    }
  };

  useEffect(() => {
    if (!searchParams) {
      return;
    }

    const queryCode = searchParams.get("code");
    const queryStart = searchParams.get("start");
    const queryPlayer = searchParams.get("player");
    setPlayer(queryPlayer);

    switch (queryPlayer) {
      case process.env.REACT_APP_YOUTUBE_PLAYER:
        setCode(queryCode);
        setOpts({
          width: "100%",
          height: "100%",
          playerVars: {
            // https://developers.google.com/youtube/player_parameters
            start: queryStart,
            autoplay: 1,
            controls: 1,
            enablejsapi: 1,
            origin: window.location.origin,
            rel: 1,
          },
        });
        break;

      default:
        break;
    }

    setLoading(false);
  }, [searchParams, loggedIn]);

  return (
    <>
      <Header />
      <main className={styles.main}>
        {loading ? (
          "Loading..."
        ) : player === process.env.REACT_APP_YOUTUBE_PLAYER ? (
          <YouTube
            id="player"
            containerClassName={styles.videoFrame}
            videoId={code}
            opts={opts}
            onPlay={onYoutubePlay}
            onPause={onYoutubePause}
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
    </>
  );
};

export default Watch;
