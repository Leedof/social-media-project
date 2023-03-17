import styles from "./Home.module.scss";

const Home = (props) => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Welcome!</h1>
      <p className={styles.text} style={{ marginBottom: "25px" }}>
        This is my pet-project made with React/Redux.
      </p>
      <p className={styles.text} style={{ marginTop: "10px" }}>
        Kindly use these credentials:
      </p>
      <p className={styles.text} style={{ marginTop: "10px" }}>
        Login: leedof4@gmail.com
        <br />
        Pass: test123123
      </p>
    </div>
  );
};

export default Home;
