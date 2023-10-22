import { ChangeEvent, FormEvent, useState } from "react";
import classes from "./EditUserProfile.module.scss";
import { Button } from "@mui/joy";
import { useAuthValue } from "../../../context/auth/authContext";
import { Form } from "react-bootstrap";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import Toastr from "../../../components/toastr/Toastr";
import { toast } from "react-toastify";

const EditUserProfilePage = () => {
  const { userData } = useAuthValue();
  const [userProfileData, setUserProfileData] = useState(userData);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUserProfileData((prevState) => {
      const updatedValues: Record<string, any> = { ...prevState };
      for (const [key, value] of Object.entries(prevState)) {
        if (key === "characteristics") {
          for (const [k, val] of Object.entries(value)) {
            if (k === event.target.id) {
              updatedValues[key][k] = event.target.value;
            } else {
              updatedValues[key][k] = val;
            }
          }
        } else {
          if (key === event.target.id) {
            updatedValues[key] = event.target.value;
          } else {
            updatedValues[key] = value;
          }
        }
      }
      return {
        ...prevState,
        ...updatedValues,
      };
    });
  };

  const onSubmitHandler = (event: FormEvent): void => {
    event.preventDefault();

    updateDoc(doc(db, "users", userData.docId), userProfileData)
      .then((data) => {
        toast.success(
          <Toastr
            itemName="Success"
            message="Profile was updated successfully."
          />
        );
      })
      .catch((err) => {
        toast.error(
          <Toastr itemName="Updating error" message="Something went wrong." />
        );
      });
  };

  return (
    <Form className="form" onSubmit={onSubmitHandler}>
      <div className={classes["personalInfo"]}>
        <h5>Personal Information</h5>
        <div className="row mb-2">
          <div className="label col-6">
            <h6>Email:</h6>
          </div>
          <input
            className="form-control"
            type="email"
            name="email"
            id="email"
            value={userProfileData?.email}
            onChange={onChangeHandler}
          />
        </div>
        <div className="row mb-2">
          <div className="label col-6">
            <h6>Location:</h6>
          </div>
          <input
            className="form-control"
            type="text"
            name="location"
            id="location"
            value={userProfileData?.location}
            onChange={onChangeHandler}
          />
        </div>
        <div className="row mb-2">
          <div className="label col-6">
            <h6>Age:</h6>
          </div>
          <input
            className="form-control col-8"
            type="number"
            name="age"
            id="age"
            min={10}
            value={userProfileData?.age}
            onChange={onChangeHandler}
          />
        </div>
        <div className="row mb-2">
          <div className="label col-6">
            <h6>Team:</h6>
          </div>
          <input
            className="form-control"
            type="text"
            name="team"
            id="team"
            value={userProfileData?.team}
            onChange={onChangeHandler}
          />
        </div>
      </div>
      <div className={classes["userCharacteristics"]}>
        <h5>Characteristics</h5>
        <div className="row mb-2">
          <div className="label col-6">
            <h6>Player Height:</h6>
          </div>
          <input
            className="form-control"
            type="number"
            min={100}
            name="userHeight"
            id="userHeight"
            value={userProfileData?.characteristics?.userHeight}
            onChange={onChangeHandler}
          />
        </div>
        <div className="row mb-2">
          <div className="label col-6">
            <h6>Player Weight:</h6>
          </div>
          <input
            className="form-control"
            type="number"
            name="userWeight"
            id="userWeight"
            min={50}
            value={userProfileData?.characteristics?.userWeight}
            onChange={onChangeHandler}
          />
        </div>
        <div className="row mb-2">
          <div className="label col-6">
            <h6>Max Jump Height (cm):</h6>
          </div>
          <input
            className="form-control"
            type="number"
            name="maxJumpHeight"
            id="maxJumpHeight"
            min={140}
            value={userProfileData?.characteristics?.maxJumpHeight}
            onChange={onChangeHandler}
          />
        </div>
        <div className="row mb-2">
          <div className="label col-6">
            <h6>Max Feed Force:</h6>
          </div>
          <input
            className="form-control"
            type="number"
            name="maxFeedForce"
            id="maxFeedForce"
            min={10}
            value={userProfileData?.characteristics?.maxFeedForce}
            onChange={onChangeHandler}
          />
        </div>
        <div className="row mb-2">
          <div className="label col-6">
            <h6>Played Games Count:</h6>
          </div>
          <input
            className="form-control"
            type="number"
            name="playedGamesCount"
            id="playedGamesCount"
            min={0}
            value={userProfileData?.characteristics?.playedGamesCount}
            onChange={onChangeHandler}
          />
        </div>
      </div>
      <Button sx={{ float: "right" }} color="success" type="submit">
        Save
      </Button>
    </Form>
  );
};

export default EditUserProfilePage;
