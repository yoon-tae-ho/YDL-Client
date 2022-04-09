import styles from "../css/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.text}>
        <span className={styles.text_block}>개발자: 윤태호, 손명현</span>
        <span className={styles.text_block}>
          이메일 주소: pln0302@yonsei.ac.kr, franksmh0409@naver.com
        </span>
      </div>
    </footer>
  );
};

export default Footer;
