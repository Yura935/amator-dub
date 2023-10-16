import { useContext, useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "../../components/header/Header";
import { Button, Modal, ModalDialog, Typography } from "@mui/joy";
import { MainContext } from "../../context/main/mainContext";

const MainPage = () => {
  const { isDeleteUserModalShown, hideModal } = useContext(MainContext);
  const deleteUserModal = (
    <Modal open={isDeleteUserModalShown} onClose={() => hideModal()}>
      <ModalDialog
        aria-labelledby="basic-modal-dialog-title"
        aria-describedby="basic-modal-dialog-description"
      >
        <Typography id="basic-modal-dialog-title" level="h2">
          Delete Account
        </Typography>
        <section>
          <h3 className="text-center">Account: user@gmail.com</h3>
          <p className="text-center">Account will be deleted!</p>
        </section>
        <section className="modal-buttons d-flex justify-content-evenly">
          <Button
            color="danger"
            aria-label="button for deleting account"
            onClick={() => {}}
          >
            Delete Account
          </Button>
          <Button
            color="neutral"
            aria-label="Cancel button for closing modal"
            onClick={() => hideModal()}
          >
            Cancel
          </Button>
        </section>
      </ModalDialog>
    </Modal>
  );
  return (
    <>
      <Header />
      {deleteUserModal}
      <Outlet />
    </>
  );
};

export default MainPage;
