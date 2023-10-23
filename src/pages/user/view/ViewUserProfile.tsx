import { useStore } from "../../../utils/storeManager";

import classes from "./ViewUserProfile.module.scss";

const ViewUserProfilePage = () => {
  const { getUserDataFromStore } = useStore();

  return (
    <>
      <div className={classes["personalInfo"]}>
        <h5>Personal Information</h5>
        <div className="row">
          <div className="label col-6">
            <h6>Email:</h6>
          </div>
          <p className="col-6">{getUserDataFromStore?.email}</p>
        </div>
        <div className="row">
          <div className="label col-6">
            <h6>City:</h6>
          </div>
          <p className="col-6">{getUserDataFromStore?.city}</p>
        </div>
        <div className="row">
          <div className="label col-6">
            <h6>Location:</h6>
          </div>
          <p className="col-6">{getUserDataFromStore?.location}</p>
        </div>
        <div className="row">
          <div className="label col-6">
            <h6>Age:</h6>
          </div>
          <p className="col-6">{getUserDataFromStore?.age}</p>
        </div>
        <div className="row">
          <div className="label col-6">
            <h6>Team:</h6>
          </div>
          <p className="col-6">{getUserDataFromStore?.team}</p>
        </div>
      </div>
      <div className={classes["userCharacteristics"]}>
        <h5>Characteristics</h5>
        <div className="row">
          <div className="label col-6">
            <h6>Player Height:</h6>
          </div>
          <p className="col-6">
            {getUserDataFromStore?.characteristics?.userHeight}
          </p>
        </div>
        <div className="row">
          <div className="label col-6">
            <h6>Player Weight:</h6>
          </div>
          <p className="col-6">
            {getUserDataFromStore?.characteristics?.userWeight}
          </p>
        </div>
        <div className="row">
          <div className="label col-6">
            <h6>Max Jump Height (cm):</h6>
          </div>
          <p className="col-6">
            {getUserDataFromStore?.characteristics?.maxJumpHeight}
          </p>
        </div>
        <div className="row">
          <div className="label col-6">
            <h6>Max Feed Force:</h6>
          </div>
          <p className="col-6">
            {getUserDataFromStore?.characteristics?.maxFeedForce}
          </p>
        </div>
        <div className="row">
          <div className="label col-6">
            <h6>Played Games Count:</h6>
          </div>
          <p className="col-6">
            {getUserDataFromStore?.characteristics?.playedGamesCount}
          </p>
        </div>
      </div>
    </>
  );
};

export default ViewUserProfilePage;
