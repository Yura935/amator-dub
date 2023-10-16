import { Button } from "@mui/joy";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import { auth, db } from "../../firebase";

import classes from "./SignUp.module.scss";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [city, setCity] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUpHandler = (event: React.FormEvent) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredentials) => {
        try {
          const docRef = await addDoc(collection(db, "users"), {
            uid: userCredentials.user.uid,
            fullName,
            email,
            city,
            age,
            avatar: "",
            registrationDate: userCredentials.user.metadata.creationTime,
            phone: "",
            team: "",
            location: "",
            characteristics: {
              userHeight: null,
              userWeight: null,
              maxJumpHeight: null,
              maxFeedForce: null,
              playedGamesCount: null,
              serving: null,
              aces: null,
              blocks: null,
            },
          });
          console.log("Document written with ID: ", docRef);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
        console.log(userCredentials);
        navigate("/user");
      })
      .catch((error) => console.log(error));
  };

  const resetValues = () => {
    setFullName("");
    setCity("");
    setAge("");
    setEmail("");
    setPassword("");
  };

  return (
    <section className={classes.signUpWrapper}>
      <div className={classes["signUpWrapper__inner"]}>
        <div className={`${classes.head} d-flex`}>
          <img className={classes.logo} src="./logo-icon.svg" alt="" />
          <h1>AMATORDUB</h1>
        </div>

        <form onSubmit={signUpHandler}>
          <h3>JOIN OUR FRIENDLY TEAM</h3>
          <div className={`${classes["form-group"]}`}>
            <input
              className="form-control"
              type="text"
              value={fullName}
              placeholder="Full Name"
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className={classes["form-group"]}>
            <input
              className="form-control"
              type="text"
              value={city}
              placeholder="City"
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div className={classes["form-group"]}>
            <input
              className="form-control"
              type="number"
              min={14}
              value={age}
              placeholder="Age"
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>
          <hr className={classes.hr} />
          <div className={`${classes["form-group"]} ${classes.inputGroup}`}>
            <span className={classes["input-icon"]}>
              <b>@</b>
            </span>
            <input
              className={`${classes["form-control"]} form-control`}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
            />
          </div>
          <div className={`${classes["form-group"]} ${classes.inputGroup}`}>
            <span className={classes["input-icon"]}>
              <FontAwesomeIcon
                size="sm"
                cursor="pointer"
                icon={faLock}
                color="gray"
              />
            </span>
            <input
              className={`${classes["form-control"]} form-control`}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Choose password"
              required
            />
          </div>
          <div className="d-flex justify-content-center">
            <Button
              className={classes.signUpButton}
              type="submit"
              sx={{ width: "90%" }}
            >
              Sign Up
            </Button>
          </div>

          <div className="d-flex mt-5 justify-content-center align-items-center">
            <Button
              color="neutral"
              type="button"
              onClick={() => navigate("/signIn")}
            >
              Log In
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignUpPage;
