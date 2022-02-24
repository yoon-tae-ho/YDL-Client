import React, { useEffect, useState } from "react";

import Header from "../components/Header";
import RowSlider from "../components/RowSlider";

const Browse = () => {
  const [loading, setLoading] = useState(true);
  const [lectures, setLectures] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/lectures`)
      .then((response) => response.json())
      .then((data) => {
        setLectures(data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      <Header />
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <div>
          <RowSlider lectures={lectures} context="Test Row" />
          <RowSlider lectures={lectures} context="Test Row" />
          <RowSlider lectures={lectures} context="Test Row" />
          <RowSlider lectures={lectures} context="Test Row" />
          <RowSlider lectures={lectures} context="Test Row" />
        </div>
      )}
    </>
  );
};

export default Browse;
