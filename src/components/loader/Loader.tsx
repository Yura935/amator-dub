import classes from "./Loader.module.scss";

const Loader = () => (
  <div className={classes["loading-screen"]}>
    <div className={classes["loading-spinner"]}>
        <img src="./ball.svg" alt="spinner" />
    </div>
  </div>
);

export default Loader;
