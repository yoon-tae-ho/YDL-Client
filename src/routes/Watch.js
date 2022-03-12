import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "../css/Watch.module.css";
import Header from "../components/Header";

const Watch = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [src, setSrc] = useState("");
  const [allow, setAllow] = useState("");

  useEffect(() => {
    const player = searchParams.get("player");
    const code = searchParams.get("code");
    const start = searchParams.get("start");

    switch (player) {
      case process.env.REACT_APP_YOUTUBE_PLAYER:
        setSrc(
          `https://www.youtube.com/embed/${code}?start=${start}&autoplay=1`
        );
        setAllow(
          "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        );
        break;

      default:
        break;
    }

    setLoading(false);
  }, [searchParams]);

  return (
    <>
      <Header />
      <main className={styles.main}>
        {loading ? (
          "Loading..."
        ) : (
          <iframe
            className={styles.videoFrame}
            title="Lecture Video"
            src={src}
            allow={allow}
            allowFullScreen
          ></iframe>
        )}
      </main>
    </>
  );
};

export default Watch;
