import { ChangeEvent, FormEvent, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { Button } from "@mui/joy";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import { getUserDataFromStore, useStore } from "../../../utils/storeManager";
import Toastr from "../../../components/toastr/Toastr";
import { db } from "../../../firebase";

import classes from "./EditUserProfile.module.scss";

const EditUserProfilePage = () => {
  const { addUserDataToStore } = useStore();
  const userData = useSelector(getUserDataFromStore);

  const [userProfileData, setUserProfileData] = useState({
    ...userData,
  });

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUserProfileData((prevState) => {
      const updatedValues: Record<string, any> = { ...prevState };
      const updatedCharacteristicsValues: Record<string, any> = {
        ...prevState.characteristics,
      };
      for (const [key, value] of Object.entries(updatedValues)) {
        if (key === event.target.id) {
          updatedValues[key] = event.target.value;
        } else {
          updatedValues[key] = value;
        }
      }
      for (const [key, value] of Object.entries(updatedCharacteristicsValues)) {
        if (key === event.target.id) {
          updatedCharacteristicsValues[key] = event.target.value.toString();
        } else {
          updatedCharacteristicsValues[key] = value;
        }
      }
      updatedValues["characteristics"] = updatedCharacteristicsValues;
      return {
        ...prevState,
        ...updatedValues,
      };
    });
  };

  const onSubmitHandler = (event: FormEvent): void => {
    event.preventDefault();

    updateDoc(doc(db, "users", userProfileData?.docId), { ...userProfileData })
      .then((data) => {
        addUserDataToStore(userProfileData);
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
        <div className="d-flex align-items-center mb-2">
          <div className="label col-4">
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
        <div className="d-flex align-items-center mb-2">
          <div className="label col-4">
            <h6>City:</h6>
          </div>
          <input
            className="form-control"
            type="text"
            name="city"
            id="city"
            value={userProfileData?.city}
            onChange={onChangeHandler}
          />
        </div>
        <div className="d-flex align-items-center mb-2">
          <div className="label col-4">
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
        <div className="d-flex align-items-center mb-2">
          <div className="label col-4">
            <h6>Age:</h6>
          </div>
          <input
            className="form-control"
            type="number"
            name="age"
            id="age"
            min={10}
            value={userProfileData?.age}
            onChange={onChangeHandler}
          />
        </div>
        <div className="d-flex align-items-center mb-2">
          <div className="label col-4">
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
        <div className="d-flex align-items-center mb-2">
          <div className="label col-4">
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
        <div className="d-flex align-items-center mb-2">
          <div className="label col-4">
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
        <div className="d-flex align-items-center mb-2">
          <div className="label col-4">
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
        <div className="d-flex align-items-center mb-2">
          <div className="label col-4">
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
        <div className="d-flex align-items-center mb-2">
          <div className="label col-4">
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
