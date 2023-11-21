import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Card } from "@mui/joy";
import moment from "moment";
import { useSelector } from "react-redux";

import { getAllUsers, getUserDataFromStore } from "../../utils/storeManager";
import { IUser } from "../../interfaces/user";
import Loader from "../../components/loader/Loader";
import { MainContext } from "../../context/main/mainContext";

import classes from "./UserProfile.module.scss";

const UserProfilePage = () => {
  // const DOMAIN = process.env.AMATOR_DUB_DOMAIN;
  const location = useLocation();
  const currentLocation = location.pathname.split("/");
  const { isLoading, setLoadingStatus } = useContext(MainContext);
  const params = useParams();

  const [mode, setMode] = useState(currentLocation[currentLocation.length - 1]);
  const { showDeleteUserModal } = useContext(MainContext);
  const navigate = useNavigate();
  const userData = useSelector(getUserDataFromStore);
  const allUsers = useSelector(getAllUsers);
  const isMe = params.uid ? params.uid === userData.uid : true;
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    if (!user) {
      const curUser = allUsers.filter((u) => u.uid === params.uid)[0];
      curUser ? setLoadingStatus(false) : setLoadingStatus(true);
      navigate(`/user/${params.uid}`);
      setMode("user");
      setUser(curUser);
    }
  }, [allUsers]);

  const showUserProfile = () => {
    setMode("user");
    navigate(`${params.uid ? params.uid : userData.uid}`);
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
              {isMe && (
                <button
                  className={
                    mode === "edit"
                      ? "btn btn-default active"
                      : "btn btn-default"
                  }
                  onClick={editUserProfile}
                >
                  Edit Account
                </button>
              )}
              {/* <button
                className="btn btn-default"
                onClick={() => showDeleteUserModal()}
              >
                Delete Account
              </button> */}
            </div>
          </div>
          <div className="col-md-8 col-md-offset-2">
            <div className="media d-flex">
              <div className={classes["pull-left"]}>
                <div className={classes["profile-icon"]}></div>
              </div>
              <div className={classes["media-body"]}>
                {!user && (
                  <>
                    <div className="placeholder-glow">
                      <div
                        className="placeholder"
                        style={{
                          width: "200px",
                          height: "30px",
                          marginBottom: "5px",
                        }}
                      ></div>
                    </div>
                    <div className="placeholder-glow">
                      <div
                        className="placeholder"
                        style={{
                          width: "200px",
                          height: "30px",
                          marginBottom: "5px",
                        }}
                      ></div>
                    </div>
                  </>
                )}
                {user && (
                  <>
                    <h4>{user?.fullName}</h4>
                    <div className="d-flex">
                      <div className={classes.registrationDate}></div>
                      Registered from{" "}
                      {moment(user?.registrationDate).format("MMMM Do YYYY")}
                    </div>
                  </>
                )}
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
