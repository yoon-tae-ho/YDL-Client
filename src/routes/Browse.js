import React, { useEffect, useState } from "react";
import axios from "axios";
import Preview from "../components/Preview";
import Header from "../components/Header";

const Browse = () => {
  const [loading, setLoading] = useState(true);
  const [lectures, setLectures] = useState([]);
  useEffect(() => {
    axios(`${process.env.REACT_APP_API_URL}/lectures`).then((response) => {
      setLectures(response.data);
      setLoading(false);
      console.log(response.data);
    });
  }, []);
  return (
    <>
      <Header />
      <h1>Browse!</h1>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <Preview
          id={lectures[0]._id}
          title={lectures[0].title}
          thumbnailUrl={lectures[0].thumbnailUrl}
          topics={lectures[0].topics}
        />
      )}
    </>
  );
};

export default Browse;
