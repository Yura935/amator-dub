import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { IUser } from "../../../interfaces/user";
import { getAllUsers } from "../../../utils/storeManager";

import classes from "./ViewUserProfile.module.scss";

const ViewUserProfilePage = () => {
  const params = useParams();
  const allUsers = useSelector(getAllUsers);
  const [userData, setUserData] = useState<IUser | null>(null);

  useEffect(() => {
    setUserData(allUsers.filter((u) => u.uid === params.uid)[0]);
  }, [allUsers]);

  return (
    <>
      <div className={classes["personalInfo"]}>
        <h5>Personal Information</h5>
        <div className="row">
          <div className={`${classes.label} col-4`}>
            <h6>Email:</h6>
          </div>
          <p className={`${classes.value} col-6`}>{userData?.email}</p>
        </div>
        <div className="row">
          <div className={`${classes.label} col-4`}>
            <h6>City:</h6>
          </div>
          <p className={`${classes.value} col-6`}>{userData?.city}</p>
        </div>
        <div className="row">
          <div className={`${classes.label} col-4`}>
            <h6>Location:</h6>
          </div>
          <p className={`${classes.value} col-6`}>{userData?.location}</p>
        </div>
        <div className="row">
          <div className={`${classes.label} col-4`}>
            <h6>Age:</h6>
          </div>
          <p className={`${classes.value} col-6`}>{userData?.age}</p>
        </div>
        <div className="row">
          <div className={`${classes.label} col-4`}>
            <h6>Team:</h6>
          </div>
          <p className={`${classes.value} col-6`}>{userData?.team}</p>
        </div>
      </div>
      <div className={classes["userCharacteristics"]}>
        <h5>Characteristics</h5>
        <div className="row">
          <div className={`${classes.label} col-4`}>
            <h6>Player Height (cm):</h6>
          </div>
          <p className={`${classes.value} col-6`}>
            {userData?.characteristics?.userHeight}
          </p>
        </div>
        <div className="row">
          <div className={`${classes.label} col-4`}>
            <h6>Player Weight (cm):</h6>
          </div>
          <p className={`${classes.value} col-6`}>
            {userData?.characteristics?.userWeight}
          </p>
        </div>
        <div className="row">
          <div className={`${classes.label} col-4`}>
            <h6>Max Jump Height (cm):</h6>
          </div>
          <p className={`${classes.value} col-6`}>
            {userData?.characteristics?.maxJumpHeight}
          </p>
        </div>
        <div className="row">
          <div className={`${classes.label} col-4`}>
            <h6>Max Feed Force:</h6>
          </div>
          <p className={`${classes.value} col-6`}>
            {userData?.characteristics?.maxFeedForce}
          </p>
        </div>
        <div className="row">
          <div className={`${classes.label} col-4`}>
            <h6>Played Games Count:</h6>
          </div>
          <p className={`${classes.value} col-6`}>
            {userData?.characteristics?.playedGamesCount}
          </p>
        </div>
      </div>
    </>
  );
};

export default ViewUserProfilePage;
