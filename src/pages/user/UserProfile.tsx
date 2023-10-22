import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { useCallback, useContext, useEffect, useState } from "react";
import { Card } from "@mui/joy";
import { User } from "firebase/auth";
import moment from "moment";

import { IUser } from "../../interfaces/user";
import Loader from "../../components/loader/Loader";
import { MainContext } from "../../context/main/mainContext";
import { db } from "../../firebase";
import { useAuthValue } from "../../context/auth/authContext";

import classes from "./UserProfile.module.scss";

const UserProfilePage = () => {
  const DOMAIN = process.env.AMATOR_DUB_DOMAIN;
  const location = useLocation();
  const currentLocation = location.pathname.split("/");
  const { isLoading, setLoadingStatus } = useContext(MainContext);

  const [mode, setMode] = useState(currentLocation[currentLocation.length - 1]);
  const { showDeleteUserModal } = useContext(MainContext);
  const navigate = useNavigate();
  const [currentUserData, setCurrentUserData] = useState<IUser | null>(null);
  const { currentUser, setUserData } = useAuthValue();

  const getUserData = useCallback(async (user: User | null) => {
    await getDocs(collection(db, "users")).then((querySnapshot) => {
      const users = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        docId: doc.id,
      }));
      const curUser = (users as IUser[]).find((u) => u?.uid === user?.uid);
      setUserData(curUser!);
      setCurrentUserData(curUser!);
      setLoadingStatus(false);
    });
  }, []);

  useEffect(() => {
    setLoadingStatus(true);
    getUserData(currentUser);
    navigate("/user");
    setMode("user");
  }, [currentUser]);

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
      <main className={classes.main}>
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
                <h4>{currentUserData?.fullName}</h4>
                <div className="d-flex">
                  <div className={classes.registrationDate}></div>
                  Registered from{" "}
                  {moment(currentUserData?.registrationDate).format(
                    "MMMM Do YYYY"
                  )}
                </div>
              </div>
            </div>
            <hr className="mt-4 mb-4" />
            <Outlet />
          </div>
        </Card>
      </main>
      {isLoading && <Loader />}
    </>
  );
};

export default UserProfilePage;
