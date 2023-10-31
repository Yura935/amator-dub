export interface IGlobalState {
  isLoading: boolean;
  isDeleteUserModalShown: boolean;
  setLoadingStatus: (status: boolean) => void;
  hideModal: () => void;
  showDeleteUserModal: () => void;
}
