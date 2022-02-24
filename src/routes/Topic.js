import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Topic = () => {
  const { id } = useParams();
  console.log();
  useEffect(() => {
    axios(`${process.env.REACT_APP_API_URL}/lectures/topics/${id}`).then(
      (response) => {
        if (response.status === 404) {
          // error process
          console.log(response);
          return;
        }
        console.log(response.data);
      }
    );
  }, [id]);

  return <div>Topic {id}!</div>;
};

export default Topic;
