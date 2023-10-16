import { useAuthValue } from "../../../context/user/userContext";

import classes from "./ViewUserProfile.module.scss";

const ViewUserProfilePage = () => {
  const { userData } = useAuthValue();
  return (
    <>
      <div className={classes["personalInfo"]}>
        <h5>Personal Information</h5>
        <div className="row">
          <div className="label col-6">
            <h6>Email:</h6>
          </div>
          <p className="col-6">{userData?.email}</p>
        </div>
        <div className="row">
          <div className="label col-6">
            <h6>City:</h6>
          </div>
          <p className="col-6">{userData?.city}</p>
        </div>
        <div className="row">
          <div className="label col-6">
            <h6>Location:</h6>
          </div>
          <p className="col-6">{userData?.location}</p>
        </div>
        <div className="row">
          <div className="label col-6">
            <h6>Age:</h6>
          </div>
          <p className="col-6">{userData?.age}</p>
        </div>
        <div className="row">
          <div className="label col-6">
            <h6>Team:</h6>
          </div>
          <p className="col-6">{userData?.team}</p>
        </div>
      </div>
      <div className={classes["userCharacteristics"]}>
        <h5>Characteristics</h5>
        <div className="row">
          <div className="label col-6">
            <h6>Player Height:</h6>
          </div>
          <p className="col-6">{userData?.characteristics?.userHeight}</p>
        </div>
        <div className="row">
          <div className="label col-6">
            <h6>Player Weight:</h6>
          </div>
          <p className="col-6">{userData?.characteristics?.userWeight}</p>
        </div>
        <div className="row">
          <div className="label col-6">
            <h6>Max Jump Height (cm):</h6>
          </div>
          <p className="col-6">{userData?.characteristics?.maxJumpHeight}</p>
        </div>
        <div className="row">
          <div className="label col-6">
            <h6>Max Feed Force:</h6>
          </div>
          <p className="col-6">{userData?.characteristics?.maxFeedForce}</p>
        </div>
        <div className="row">
          <div className="label col-6">
            <h6>Played Games Count:</h6>
          </div>
          <p className="col-6">{userData?.characteristics?.playedGamesCount}</p>
        </div>
      </div>
    </>
  );
};

export default ViewUserProfilePage;
