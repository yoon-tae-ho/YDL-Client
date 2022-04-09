import styles from "../css/VideoLoading.module.css";

const VideoLoading = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.loading}>
        <div className={styles.bulletouter}>
          <div className={styles.bulletinner}></div>
          <div className={styles.mask}></div>
          <div className={styles.dot}></div>
        </div>
        {/* <p className={styles.text}>Loading...</p> */}
      </div>
    </div>
  );
};

export default VideoLoading;
