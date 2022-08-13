import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import CircleLoading from "../components/CircleLoading";
import Footer from "../components/Footer";
import { getTopicCategory } from "../controllers/lectureController";
import styles from "../css/Category.module.css";

const Category = () => {
  const { isLoading, data } = useQuery(["topic", "category"], getTopicCategory);

  return (
    <>
      <main className={styles.wrapper}>
        {isLoading ? (
          <CircleLoading />
        ) : (
          <ul className={styles.topic_list}>
            {data
              .sort((a, b) => (a.name < b.name ? -1 : 1))
              .map((topic) => (
                <li key={topic._id} className={styles.topic_item}>
                  <Link to={`/browse/topics/${topic._id}`}>{topic.name}</Link>
                </li>
              ))}
          </ul>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Category;
