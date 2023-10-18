import { createContext, useReducer } from "react";
import { BaseProps } from "../../interfaces/baseProps";
import { IGlobalState } from "../../interfaces/globalState";
import MainReducer from "./mainReducer";

export const initialGlobalState: IGlobalState = {
  isLoading: true,
  isDeleteUserModalShown: false,
  setLoadingStatus: (status: boolean) => {},
  hideModal: () => {},
  showDeleteUserModal: () => {},
};

export const MainContext = createContext(initialGlobalState);

export const MainProvider = ({ children }: BaseProps) => {
  const [state, dispatch] = useReducer(MainReducer, initialGlobalState);

  const setLoadingStatus = (status: boolean) => {
    dispatch({
      type: "SET_LOADING_STATUS",
      payload: status,
    });
  };

  const hideModal = () => {
    dispatch({
      type: "HIDE_MODAL",
    });
  };

  const showDeleteUserModal = () => {
    dispatch({
      type: "SHOW_MODAL",
    });
  };

  return (
    <MainContext.Provider
      value={{
        isLoading: state.isLoading,
        isDeleteUserModalShown: state.isDeleteUserModalShown,
        setLoadingStatus,
        hideModal,
        showDeleteUserModal,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
