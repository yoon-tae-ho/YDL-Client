import { useEffect, useState } from "react";
import YouTube from "react-youtube";

const YoutubePlayer = ({
  wrapperClass,
  loggedIn,
  putViewed,
  INTERVAL_TIME,
  embededCode,
  time,
}) => {
  const [intervalId, setIntervalId] = useState("");

  const onReady = (event) => {
    if (loggedIn) {
      const time = Math.floor(event.target.getCurrentTime());
      const duration = Math.floor(event.target.getDuration());
      putViewed(time, duration);
    }
  };

  const onPlay = (event) => {
    if (loggedIn && !intervalId) {
      const time = Math.floor(event.target.getCurrentTime());
      const duration = Math.floor(event.target.getDuration());
      const id = setInterval(() => {
        putViewed(time, duration);
      }, INTERVAL_TIME);
      setIntervalId(id);
    }
  };

  const onPause = (event) => {
    if (!loggedIn) return;

    const time = Math.floor(event.target.getCurrentTime());
    const duration = Math.floor(event.target.getDuration());
    putViewed(time, duration);

    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId("");
    }
  };

  const onEnd = (event) => {};

  // clear interval
  useEffect(() => {
    return () => {
      if (intervalId) {
        clearTimeout(intervalId);
        setIntervalId("");
      }
    };
  }, [intervalId]);

  return (
    <YouTube
      id="player"
      className={wrapperClass}
      videoId={embededCode}
      opts={{
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
      }}
      onReady={onReady}
      onPlay={onPlay}
      onPause={onPause}
      onEnd={onEnd}
    />
  );
};

export default YoutubePlayer;
