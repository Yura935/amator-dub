import { collection, getDocs } from "firebase/firestore";
import { ToastContainer } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

import { auth, db } from "./firebase";
import { IUser } from "./interfaces/user";
import { MainProvider } from "./context/main/mainContext";
import router from "./router/router";
import { useStore } from "./utils/storeManager";

import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import classes from "./App.module.scss";

const App = () => {
  const {
    addCurrentUserToStore,
    addUserDataToStore,
    removeCurrentUserFromStore,
    removeUserDataFromStore,
  } = useStore();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      console.log(user);
      user ? addCurrentUserToStore(user) : removeCurrentUserFromStore();
      await getDocs(collection(db, "users")).then((querySnapshot) => {
        const users = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          docId: doc.id,
        }));
        const curUser = (users as IUser[]).find((u) => u?.uid === user?.uid);
        curUser ? addUserDataToStore(curUser) : removeUserDataFromStore();
      });
      user && localStorage.setItem("uid", user!.uid);
    });
  }, []);

  return (
    <div className={classes.app}>
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
    </div>
  );
};

export default App;
