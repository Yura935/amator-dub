import { useContext, useState } from "react";
import { Card } from "@mui/joy";
import moment from "moment";

import Header from "../../components/header/Header";

import classes from "./UserProfile.module.scss";
import { IUser } from "../../interfaces/user";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { MainContext } from "../../context/main/mainContext";

const UserProfilePage = () => {
  const DOMAIN = process.env.AMATOR_DUB_DOMAIN;
  const location = useLocation();
  const currentLocation = location.pathname.split("/");
  console.log(currentLocation);

  const [mode, setMode] = useState(currentLocation[currentLocation.length - 1]);
  const { showDeleteUserModal } = useContext(MainContext);
  const navigate = useNavigate();

  const userMock: IUser = {
    fullName: "Bohdan Kolodiy",
    registrationDate: moment().toString(),
    email: "user@gmail.com",
    avatar: "",
    age: 22,
    location: "Lviv",
    id: "testId",
    team: "POLITECH",
    characteristics: {
      userHeight: 170,
      userWeight: 77,
      aces: 0,
      blocks: 30,
      maxJumpHeight: 190,
      maxFeedForce: 30,
      playedGamesCount: 100,
    },
  };

  const showUserProfile = () => {
    setMode("user");
    navigate("");
  };

  const editUserProfile = () => {
    setMode("edit");
    navigate("edit");
  };

  return (
    <>
      <main className={`${classes.main} container`}>
        <Card
          sx={{
            width: "100%",
            maxWidth: "1140px",
            boxShadow: "lg",
            display: "flex",
            flexDirection: "column",
            marginBottom: 2,
          }}
        >
          <div
            className={`${classes.pageTitle} d-flex justify-content-between`}
          >
            <h2>ACCOUNT PROFILE</h2>
            <div className="btn-group">
              <button
                className={
                  mode === "user" ? "btn btn-default active" : "btn btn-default"
                }
                onClick={showUserProfile}
              >
                View Account
              </button>
              <button
                className={
                  mode === "edit" ? "btn btn-default active" : "btn btn-default"
                }
                onClick={editUserProfile}
              >
                Edit Account
              </button>
              <button
                className="btn btn-default"
                onClick={() => showDeleteUserModal()}
              >
                Delete Account
              </button>
            </div>
          </div>
          <div className="col-md-8 col-md-offset-2">
            <div className="media d-flex">
              <div className={classes["pull-left"]}>
                <img
                  className={classes["profile-icon"]}
                  src="./userIcon.svg"
                  alt="user icon"
                />
              </div>
              <div className={classes["media-body"]}>
                <h4>{userMock.fullName}</h4>
                <div className="d-flex">
                  <div className={classes.registrationDate}></div>
                  Registered from{" "}
                  {moment(userMock.registrationDate).format("MMMM Do YYYY")}
                </div>
              </div>
            </div>
            <hr className="mt-4 mb-4" />
            <Outlet />
          </div>
        </Card>
      </main>
    </>
  );
};

export default UserProfilePage;
