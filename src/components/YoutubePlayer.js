import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import YouTube from "react-youtube";
import { getNextVideo } from "../controllers/lectureController";

const YoutubePlayer = ({
  videoId,
  wrapperClass,
  loggedIn,
  INTERVAL_TIME,
  viewedTime,
  viewedDuration,
  belongIn,
  putViewed,
  embededCode,
}) => {
  const [intervalId, setIntervalId] = useState("");
  const navigate = useNavigate();

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

  const onEnd = async (event) => {
    const { isError, isLast, nextId } = await getNextVideo(videoId);
    if (isError) navigate("/");
    else if (isLast) navigate(`/browse/${belongIn}`);
    else navigate(`/watch/${nextId}`);
  };

  // clear interval
  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
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
          start:
            viewedDuration === -1
              ? 0
              : viewedDuration === viewedTime
              ? 0
              : viewedTime,
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
