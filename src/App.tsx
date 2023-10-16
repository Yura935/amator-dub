import { User, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { MainContext, MainProvider } from "./context/main/mainContext";
import { auth, db } from "./firebase";
import { AuthProvider } from "./context/user/userContext";
import { IUser } from "./interfaces/user";
import Loader from "./components/loader/Loader";
import router from "./router/router";

import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./App.module.scss";

const App = () => {
  const { isLoading } = useContext(MainContext);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<IUser | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      await getDocs(collection(db, "users")).then((querySnapshot) => {
        const users = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          docId: doc.id,
        }));
        const curUser = (users as IUser[]).find((u) => u?.uid === user?.uid);
        setUserData(curUser!);
      });
      setCurrentUser(user);
    });
  }, []);

  return (
    <div className={classes.app}>
      <AuthProvider value={{ currentUser, userData }}>
        <MainProvider>
          {isLoading && <Loader />}
          <RouterProvider router={router}></RouterProvider>
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
      </AuthProvider>
    </div>
  );
};

export default App;
