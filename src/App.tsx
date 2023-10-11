import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import router from "./router/router";

import classes from "./App.module.scss";

const App = () => (
  <div className={classes.app}>
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
      </div>
);

export default App;
