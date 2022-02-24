import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Lecture = () => {
  const { id } = useParams();
  const [lecture, setLecture] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/lectures/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setLecture(data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  // video Link path
  // `/watch?code=${encodeURIComponent(lecture.videos[0].embededCode)}`

  return (
    <div>
      {lecture && (
        <Link
          to={`/watch?code=${encodeURIComponent(
            lecture.videos[0].embededCode
          )}`}
        >
          to Video
        </Link>
      )}
    </div>
  );
};

export default Lecture;
