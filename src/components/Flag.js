import styles from "../css/Flag.module.css";

const Flag = ({ imgSrc }) => {
  return (
    <div className={styles.background}>
      <img
        className={styles.symbol}
        src={imgSrc}
        alt={process.env.REACT_APP_THUMBNAIL_ALT}
      />
    </div>
  );
};

export default Flag;
