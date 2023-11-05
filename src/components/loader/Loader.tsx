import classes from "./Loader.module.scss";

const Loader = () => (
  <div className={classes["loading-screen"]}>
    <div className={classes["loading-spinner"]}>
      <div className={classes.spinnerImage}></div>
    </div>
  </div>
);

export default Loader;
