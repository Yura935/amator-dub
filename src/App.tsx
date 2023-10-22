import { User, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

import { auth, db } from "./firebase";
import { AuthContextProvider } from "./context/auth/authContext";
import { IUser } from "./interfaces/user";
import { MainProvider } from "./context/main/mainContext";
import router from "./router/router";

import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./App.module.scss";

const App = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<IUser | null>(null);
  // useEffect(() => {
  //   onAuthStateChanged(auth, async (user) => {
  //     console.log(user);
      // await getDocs(collection(db, "users")).then((querySnapshot) => {
      //   const users = querySnapshot.docs.map((doc) => ({
      //     ...doc.data(),
      //     docId: doc.id,
      //   }));
      //   const curUser = (users as IUser[]).find((u) => u?.uid === user?.uid);
      //   setUserData(curUser!);
      // });
  //     setCurrentUser(user);
  //     user && localStorage.setItem("uid", user!.uid);
  //   });
  // }, []);

  return (
    <div className={classes.app}>
      <AuthContextProvider>
        <MainProvider>
          {router}
          <ToastContainer
            role="alert"
            position="top-right"
            autoClose={3000}
            draggable
            closeOnClick
            pauseOnHover={false}
            hideProgressBar={false}
            theme="colored"
          />
        </MainProvider>
      </AuthContextProvider>
    </div>
  );
};

export default App;
