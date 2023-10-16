import {
  faPersonWalkingArrowRight,
  faUser,
  faUserGear,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useNavigate } from "react-router-dom";

import classes from "./Header.module.scss";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

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
    navigate("signIn");
  };

  return (
    <header className={classes.header}>
      <div className={classes["header-logo"]}>
        <img
          src="./fullLogo.svg"
          alt="amatorDub logo"
          onClick={openUserProfilePage}
        />
        {/* <div
          className={classes["logoIcon"]}
          onClick={openUserProfilePage}
        ></div> */}
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
              <a href="">
                <FontAwesomeIcon
                  size="xl"
                  cursor="pointer"
                  icon={faUserGear}
                  onClick={openProfileMenu}
                />
                <span>Account Profile</span>
              </a>
            </li>
            <li>
              <a href="" onClick={onSignOut}>
                <FontAwesomeIcon
                  size="xl"
                  cursor="pointer"
                  icon={faPersonWalkingArrowRight}
                  onClick={openProfileMenu}
                />
                <span>Sign Out</span>
              </a>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
