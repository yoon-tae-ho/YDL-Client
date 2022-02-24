import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const Topic = () => {
  const { id } = useParams();
  console.log();
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/lectures/topics/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  return <div>Topic {id}!</div>;
};

export default Topic;
