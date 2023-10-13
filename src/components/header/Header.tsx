import {
  faPersonWalkingArrowRight,
  faUser,
  faUserGear,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useNavigate } from "react-router-dom";

import classes from "./Header.module.scss";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const openUserProfilePage = () => {
    navigate("/");
  };

  const openProfileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={classes.header}>
      <div className={classes["header-logo"]}>
        <img
          src="./fullLogo.png"
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
              <a href="">
                <FontAwesomeIcon
                  size="xl"
                  cursor="pointer"
                  icon={faPersonWalkingArrowRight}
                  onClick={openProfileMenu}
                />
                <span>LogOut</span>
              </a>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
