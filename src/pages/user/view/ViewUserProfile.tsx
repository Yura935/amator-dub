import classes from "./ViewUserProfile.module.scss";

const ViewUserProfilePage = () => {
  const a = 0;
  // return (<div></div>);
  return (
    <>
      <div className={classes["personalInfo"]}>
        <h5>Personal Information</h5>
        <div className="row">
          <div className="label col-6">
            <h6>Email:</h6>
          </div>
          <p className="col-6">user@gmail.com</p>
        </div>
        <div className="row">
          <div className="label col-6">
            <h6>Location:</h6>
          </div>
          <p className="col-6">Lviv, Syhiv</p>
        </div>
        <div className="row">
          <div className="label col-6">
            <h6>Age:</h6>
          </div>
          <p className="col-6">22</p>
        </div>
        <div className="row">
          <div className="label col-6">
            <h6>Team:</h6>
          </div>
          <p className="col-6">POLITECH</p>
        </div>
      </div>
      <div className={classes["userCharacteristics"]}>
        <h5>Characteristics</h5>
        <div className="row">
          <div className="label col-6">
            <h6>Player Height:</h6>
          </div>
          <p className="col-6">168</p>
        </div>
        <div className="row">
          <div className="label col-6">
            <h6>Player Weight:</h6>
          </div>
          <p className="col-6">70</p>
        </div>
        <div className="row">
          <div className="label col-6">
            <h6>Max Jump Height (cm):</h6>
          </div>
          <p className="col-6">190</p>
        </div>
        <div className="row">
          <div className="label col-6">
            <h6>Max Feed Force:</h6>
          </div>
          <p className="col-6">40</p>
        </div>
        <div className="row">
          <div className="label col-6">
            <h6>Played Games Count:</h6>
          </div>
          <p className="col-6">100</p>
        </div>
      </div>
    </>
  );
};

export default ViewUserProfilePage;
