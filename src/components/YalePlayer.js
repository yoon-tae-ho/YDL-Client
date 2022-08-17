import { useEffect, useState } from "react";

const YalePlayer = ({
  wrapperClass,
  loggedIn,
  INTERVAL_TIME,
  viewedTime,
  putViewed,
  videoSrc,
  videoType,
  trackSrc,
  trackKind,
  trackSrclang,
  thumbnailUrl,
}) => {
  const [intervalId, setIntervalId] = useState("");

  const onReady = (event) => {
    if (loggedIn) {
      // set start time
      event.target.currentTime = viewedTime;
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
