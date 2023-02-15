import React from "react";
import styles from "./Header.module.scss";

import Logo from "../../assets/images/logo.svg";
import profileImage from "../../assets/images/profile.jpg";
import logoutImg from "../../assets/Icons/auth/logout.svg";
import loginImg from "../../assets/Icons/auth/login.svg";
import { Link } from "react-router-dom";

const Header = ({ isAuth, signOutHandler }) => {
  return (
    <header className={styles.header}>
      <div className={styles.сontainer}>
        <div className={styles.logo}>
          <img src={Logo} alt="logo" />
        </div>
        <div className={styles.actions}>
          {isAuth ? (
            <>
              <div className={styles.actions__profile}>
                <img src={profileImage} alt="profile" width={45} height={45} />
              </div>
              <div onClick={signOutHandler} className={styles.actions__auth}>
                <img src={logoutImg} alt="logout" />
              </div>
            </>
          ) : (
            <Link to="/login" className={styles.actions__auth}>
              <img src={loginImg} alt="login" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
