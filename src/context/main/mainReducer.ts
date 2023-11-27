import { IAction } from "../../interfaces/action";
import { IGlobalState } from "../../interfaces/globalState";

const MainReducer = (state: IGlobalState, action: IAction) => {
  switch (action.type) {
    case "SET_LOADING_STATUS":
      return {
        ...state,
        isLoading: action.payload
      };
    case "HIDE_MODAL":
      return {
        ...state,
        isDeleteUserModalShown: false
      };
    case "SHOW_MODAL":
      return {
        ...state,
        isDeleteUserModalShown: true
      };
    default:
      return state;
  }
};

export default MainReducer;
