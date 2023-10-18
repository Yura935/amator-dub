import { useContext, useEffect } from "react";

import Loader from "../../components/loader/Loader";
import { MainContext } from "../../context/main/mainContext";

const NotFoundPage = () => {
  const { isLoading, setLoadingStatus } = useContext(MainContext);

  useEffect(() => {
    setTimeout(() => {
      setLoadingStatus(false);
    }, 1000);
  }, [setLoadingStatus]);

  return (
    <>
      <h1>404 Page not found</h1>
      {isLoading && <Loader />}
    </>
  );
};

export default NotFoundPage;
