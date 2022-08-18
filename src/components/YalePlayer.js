import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getNextVideo } from "../controllers/lectureController";

const YalePlayer = ({
  videoId,
  wrapperClass,
  loggedIn,
  INTERVAL_TIME,
  viewedTime,
  viewedDuration,
  belongIn,
  putViewed,
  videoSrc,
  videoType,
  trackSrc,
  trackKind,
  trackSrclang,
  thumbnailUrl,
}) => {
  const [intervalId, setIntervalId] = useState("");
  const navigate = useNavigate();

  const onReady = (event) => {
    if (loggedIn) {
      // set start time
      event.target.currentTime =
        viewedDuration === -1
          ? 0
          : viewedDuration === viewedTime
          ? 0
          : viewedTime;
      const time = Math.floor(event.target.currentTime);
      const duration = Math.floor(event.target.duration);
      putViewed(time, duration);
    }
  };

  const onPlay = (event) => {
    if (loggedIn && !intervalId) {
      const time = Math.floor(event.target.currentTime);
      const duration = Math.floor(event.target.duration);
      const id = setInterval(() => {
        putViewed(time, duration);
      }, INTERVAL_TIME);
      setIntervalId(id);
    }
  };

  const onPause = (event) => {
    if (!loggedIn) return;

    const time = Math.floor(event.target.currentTime);
    const duration = Math.floor(event.target.duration);
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

  // clear interval at unmount.
  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId("");
      }
    };
  }, [intervalId]);

  return (
    <video
      className={wrapperClass}
      poster={thumbnailUrl}
      controls
      autoPlay
      onLoadedMetadata={onReady}
      onPlay={onPlay}
      onPause={onPause}
      onEnded={onEnd}
    >
      <source src={videoSrc} type={videoType} />
      <track src={trackSrc} kind={trackKind} srcLang={trackSrclang} default />
      Your browser does not support video tag.
    </video>
  );
};

export default YalePlayer;
