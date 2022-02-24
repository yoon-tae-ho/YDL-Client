import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Lecture = () => {
  const { id } = useParams();
  const [lecture, setLecture] = useState(null);

  useEffect(() => {
    axios(`${process.env.REACT_APP_API_URL}/lectures/${id}`).then(
      (response) => {
        if (response.status === 404) {
          // error process
          return;
        }
        setLecture(response.data);
        console.log(response.data);
      }
    );
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
