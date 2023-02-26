import styles from "./Home.module.scss";

const Home = (props) => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Welcome!</h1>
      <p className={styles.text}>
        This is my pet-project made with React/Redux.
      </p>
    </div>
  );
};

export default Home;
