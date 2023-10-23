import { Button, Modal, ModalDialog, Typography } from "@mui/joy";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { useContext } from "react";

import Header from "../../components/header/Header";
import { MainContext } from "../../context/main/mainContext";
import { useStore } from "../../utils/storeManager";

import classes from "./Main.module.scss";

const MainPage = () => {
  const { isDeleteUserModalShown, hideModal } = useContext(MainContext);
  const { getUserDataFromStore } = useStore();
  const location = useLocation();
  const navigate = useNavigate();

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
          <h5 className="text-center">
            Account: {getUserDataFromStore?.email}
          </h5>
          <p className="text-center">will be deleted!</p>
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
      <Nav className={classes.nav} variant="underline" defaultActiveKey="">
        <Nav.Item>
          <Nav.Link
            active={location.pathname.includes("games")}
            className={classes.navLink}
            onClick={() => navigate("/games")}
          >
            Available Games
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            active={location.pathname.includes("overall-rating")}
            className={classes.navLink}
            onClick={() => navigate("/overall-rating")}
          >
            Overall Rating
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {deleteUserModal}
      <div className="container">
        <Outlet />
      </div>
    </>
  );
};

export default MainPage;
