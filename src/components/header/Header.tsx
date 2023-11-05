import { Link, useNavigate } from "react-router-dom";
import {
  faPersonWalkingArrowRight,
  faUser,
  faUserGear,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useState } from "react";

import Toastr from "../toastr/Toastr";
import { auth } from "../../firebase";

import classes from "./Header.module.scss";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const openUserProfilePage = () => {
    navigate("/");
  };

  const openProfileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const onSignOut = () => {
    signOut(auth);
    openProfileMenu();
    localStorage.clear();
    toast.success(
      <Toastr itemName="Success" message="You are now logged out." />
    );
  };

  return (
    <header className={classes.header}>
      <div className={classes["header-logo"]}>
        <div
          className={classes["logoIcon"]}
          onClick={openUserProfilePage}
        ></div>
      </div>
      <nav className={classes["header-tabs"]}>
        <FontAwesomeIcon
          size="xl"
          cursor="pointer"
          icon={faUser}
          onClick={openProfileMenu}
        />
        {isMenuOpen && (
          <ul className={classes.profileMenu}>
            <li>
              <Link to="/user" onClick={openProfileMenu}>
                <FontAwesomeIcon size="xl" cursor="pointer" icon={faUserGear} />
                <span>Account Profile</span>
              </Link>
            </li>
            <li>
              <Link to="/signIn" onClick={onSignOut}>
                <FontAwesomeIcon
                  size="xl"
                  cursor="pointer"
                  icon={faPersonWalkingArrowRight}
                />
                <span>Sign Out</span>
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
