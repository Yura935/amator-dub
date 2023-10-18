import { Button, Card, CardContent, Typography } from "@mui/joy";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import Loader from "../../components/loader/Loader";
import { MainContext } from "../../context/main/mainContext";
import Toastr from "../../components/toastr/Toastr";
import { auth } from "../../firebase";

import classes from "./SignIn.module.scss";

const LoginPage = () => {
  const { isLoading, setLoadingStatus } = useContext(MainContext);
  const navigate = useNavigate();
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

  const handleSignInSubmit = (event: React.FormEvent) => {
    setLoadingStatus(true);
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        console.log(userCredentials);
        navigate("/user");
        setLoadingStatus(false);
        toast.success(
          <Toastr itemName="Success" message="Welcome to AmatorDub." />
        );
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          <Toastr itemName="Sign In error" message="Wrong login or password." />
        );
      });
  };

  return (
    <>
      <div className={classes.formWrapper}>
        <div className={classes["formWrapper__inner"]}>
          <div className={`${classes.head} d-flex`}>
            <img className={classes.logo} src="./logo-icon.svg" alt="" />
            <h1>AMATORDUB</h1>
          </div>
          <div className={classes["registerMenu"]}>
            <h6>NOT A MEMBER YET?</h6>
            <Button
              color="success"
              role="button"
              onClick={() => navigate("/signUp")}
            >
              Register
            </Button>
          </div>
          <Card
            sx={{
              width: 320,
              maxWidth: "100%",
              boxShadow: "lg",
              minWidth: "400px",
            }}
          >
            <CardContent
              sx={{
                alignItems: "center",
                textAlign: "center",
                padding: "34px",
              }}
            >
              <Typography fontSize="lg" fontWeight="lg">
                <FontAwesomeIcon
                  className={classes.loginLogo}
                  size="sm"
                  cursor="default"
                  icon={faLock}
                  color="black"
                />
                LOGIN
              </Typography>
              <form className={classes.signForm} onSubmit={handleSignInSubmit}>
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
                <Button
                  variant="soft"
                  type="submit"
                  color="neutral"
                  aria-label="submit the form"
                >
                  Login
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      {isLoading && <Loader />}
    </>
  );
};

export default LoginPage;
