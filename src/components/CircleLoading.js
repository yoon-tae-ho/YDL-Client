import styles from "../css/CircleLoading.module.css";

const CircleLoading = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.loading}>
        <div className={styles.bulletouter}>
          <div className={styles.bulletinner}></div>
          <div className={styles.mask}></div>
          {/* <div className={styles.dot}></div> */}
        </div>
        {/* <p className={styles.text}>Loading...</p> */}
      </div>
    </div>
  );
};

export default CircleLoading;
