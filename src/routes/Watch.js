import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Watch = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [src, setSrc] = useState("");
  const [allow, setAllow] = useState("");

  useEffect(() => {
    const domparser = new DOMParser();
    const doc = domparser.parseFromString(
      searchParams.get("code"),
      "text/html"
    );
    const code = doc.firstChild.querySelector("iframe");
    let {
      src: { nodeValue: videoSrc },
      allow: { nodeValue: videoAllow },
    } = code.attributes;

    videoSrc += "?autoplay=1";

    setSrc(videoSrc);
    setAllow(videoAllow);
    setLoading(false);
  }, [searchParams]);

  return (
    <div>
      {loading ? (
        "Loading..."
      ) : (
        <iframe
          style={{
            width: "100vw",
            aspectRatio: "16 / 9",
          }}
          title="Lecture Video"
          src={src}
          allow={allow}
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};

export default Watch;
