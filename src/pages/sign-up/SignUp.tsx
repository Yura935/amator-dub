import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Button } from "@mui/joy";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../firebase";
import Loader from "../../components/loader/Loader";
import { MainContext } from "../../context/main/mainContext";
import Toastr from "../../components/toastr/Toastr";

import classes from "./SignUp.module.scss";

const SignUpPage = () => {
  const { isLoading, setLoadingStatus } = useContext(MainContext);
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [city, setCity] = useState("");
  const [age, setAge] = useState<number>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setLoadingStatus(true);
    setTimeout(() => {
      setLoadingStatus(false);
    }, 1000);
  }, []);

  const signInputsList = [
    {
      key: "Email",
      value: email,
      onChange: (event: ChangeEvent<HTMLInputElement>) =>
        setEmail(event.target.value),
      inputParams: { placeholder: "Enter email", type: "email" },
      icon: <b>@</b>,
    },
    {
      key: "Password",
      value: password,
      onChange: (event: ChangeEvent<HTMLInputElement>) =>
        setPassword(event.target.value),
      inputParams: { placeholder: "Choose password", type: "password" },
      icon: (
        <FontAwesomeIcon
          size="sm"
          cursor="pointer"
          icon={faLock}
          color="gray"
        />
      ),
    },
  ];

  const signUpHandler = (event: React.FormEvent) => {
    setLoadingStatus(true);
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
              playedGamesCount: 0,
              serving: null,
              aces: null,
              blocks: null,
            },
          });
          console.log("Document written with ID: ", docRef);
        } catch (e: any) {
          toast.error(<Toastr itemName="Error" message={e} />);
          console.error("Error adding document: ", e);
        }
        console.log(userCredentials);
        navigate("/user");
        setLoadingStatus(false);
        toast.success(
          <Toastr itemName="Success" message="Welcome to AmatorDub." />
        );
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          <Toastr itemName="Sign Up error" message="Email already in use." />
        );
      });
  };

  // const resetValues = () => {
  //   setFullName("");
  //   setCity("");
  //   setAge(null);
  //   setEmail("");
  //   setPassword("");
  // };

  return (
    <>
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
                onChange={(e) => setAge(Number(e.target.value))}
                required
              />
            </div>
            <hr className={classes.hr} />
            {signInputsList.map((input) => (
              <div
                key={input.key}
                className={`${classes["form-group"]} ${classes.inputGroup}`}
              >
                <span className={classes["input-icon"]}>{input.icon}</span>
                <input
                  className={`${classes["formControl"]} form-control`}
                  type={input.inputParams.type}
                  value={input.value}
                  onChange={input.onChange}
                  placeholder={input.inputParams.placeholder}
                  required
                />
              </div>
            ))}
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
      {isLoading && <Loader />}
    </>
  );
};

export default SignUpPage;
