import styles from "../css/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.text}>
        <span className={styles.text_block}>개발자: 윤태호</span>
        <span className={styles.text_block}>이메일: pln0302@yonsei.ac.kr</span>
      </div>
    </footer>
  );
};

export default Footer;
