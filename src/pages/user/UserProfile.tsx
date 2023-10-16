import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Card } from "@mui/joy";
import moment from "moment";

import { IUser } from "../../interfaces/user";
import { MainContext } from "../../context/main/mainContext";

import classes from "./UserProfile.module.scss";
import { useAuthValue } from "../../context/user/userContext";

const UserProfilePage = () => {
  const DOMAIN = process.env.AMATOR_DUB_DOMAIN;
  const location = useLocation();
  const currentLocation = location.pathname.split("/");

  const [mode, setMode] = useState(currentLocation[currentLocation.length - 1]);
  const { showDeleteUserModal } = useContext(MainContext);
  const navigate = useNavigate();
  const { userData } = useAuthValue();

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
                <h4>{userData?.fullName}</h4>
                <div className="d-flex">
                  <div className={classes.registrationDate}></div>
                  Registered from{" "}
                  {moment(userData?.registrationDate).format("MMMM Do YYYY")}
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
