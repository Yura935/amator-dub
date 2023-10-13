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

import classes from "./Login.module.scss";

const LoginPage = () => {
  //   const { login } = authAPI();
  //   const navigate = useNavigate();
  //   const { addUserToStore } = useStoreUser();
  //   const { saveLocalUserData } = localStorageManager();
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

    // if (email.length && password.length) {
    //   setIsLoginRequest(true);

    //   try {
    //     const user = await login(email, password);

    //     setEmail("");
    //     setPassword("");
    //     setIsLoginRequest(false);
    //     addUserToStore(user);
    //     saveLocalUserData(user);

    //     user.role === "user" ? navigate("/") : navigate("/admin/");
    //   } catch (error) {
    //     setIsLoginRequest(false);
    //     toast.error(
    //       <Toastr itemName="Login error" message="Empty login or password" />
    //     );

    //     return error;
    //   }
    // } else {
    //   toast.error(
    //     <Toastr itemName="Login error" message="Wrong login or password" />
    //   );
    // }

    return;
  };

  return (
    <>
      <div className={classes.formWrapper}>
        <Card
          sx={{
            width: 320,
            maxWidth: "100%",
            boxShadow: "lg",
          }}
        >
          <CardContent sx={{ alignItems: "center", textAlign: "center" }}>
            <Typography fontSize="lg" fontWeight="lg">
              Welcome to AmatorDub
            </Typography>
            <form className={classes.signForm} onSubmit={handleSignInSubmit}>
              {signInputsList.map((input) => (
                <Input
                  key={input.key}
                  variant="outlined"
                  color="neutral"
                  value={input.value}
                  onChange={input.onChange}
                  slotProps={{ input: input.inputParams }}
                  sx={{ mb: 1, fontSize: "var(--joy-fontSize-sm)" }}
                  disabled={isLoginRequest}
                />
              ))}
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
    </>
  );
};

export default LoginPage;
