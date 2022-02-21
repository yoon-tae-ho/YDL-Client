import React, { useEffect, useState } from "react";
import axios from "axios";

import Header from "../components/Header";
import RowSlider from "../components/RowSlider";

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
