import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Input,
  Typography,
} from "@mui/joy";

import Toastr from "../../components/toastr/Toastr";

import classes from "./SignIn.module.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginRequest, setIsLoginRequest] = useState(false);

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const signInputsList = [
    {
      key: "Email",
      value: email,
      onChange: handleEmailChange,
      inputParams: { placeholder: "Email" },
    },
    {
      key: "Password",
      value: password,
      onChange: handlePasswordChange,
      inputParams: { placeholder: "Password", type: "password" },
    },
  ];

  const handleSignInSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        console.log(userCredentials);
        navigate("/user");
      })
      .catch((err) => console.log(err));
  };

  return (
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
            sx={{ alignItems: "center", textAlign: "center", padding: "34px" }}
          >
            <Typography fontSize="lg" fontWeight="lg">
              <FontAwesomeIcon
                className={classes.loginLogo}
                size="sm"
                cursor="pointer"
                icon={faLock}
                color="black"
              />
              LOGIN
            </Typography>
            <form className={classes.signForm} onSubmit={handleSignInSubmit}>
              <div className={`${classes["form-group"]} ${classes.inputGroup}`}>
                <span className={classes["input-icon"]}>
                  <b>@</b>
                </span>
                <input
                  className="form-control"
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
                  className="form-control"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Choose password"
                  required
                />
              </div>
              <Button
                variant="soft"
                type="submit"
                color="neutral"
                aria-label="submit the form"
              >
                {isLoginRequest ? <CircularProgress /> : "Login"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
