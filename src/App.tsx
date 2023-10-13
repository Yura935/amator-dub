import { useContext } from "react";

import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import router from "./router/router";

import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./App.module.scss";
import Loader from "./components/loader/Loader";
import { MainContext, MainProvider } from "./context/main/mainContext";

const App = () => {
  const { isLoading } = useContext(MainContext);
  console.log(isLoading);

  return (
    <div className={classes.app}>
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
    </div>
  );
};

export default App;
