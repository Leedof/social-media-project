import React from "react";
import styles from "./Header.module.scss";

import Logo from "../../assets/images/logo.svg";
import { Link } from "react-router-dom";

const Header = ({ isAuth, photos, signOutHandler }) => {
  return (
    <header className={styles.header}>
      <div className={styles.сontainer}>
        <div className={styles.logo}>
          <img src={Logo} alt="logo" />
        </div>
        <div className={styles.actions}>
          {isAuth ? (
            <Link
              to="/login"
              className={styles.actions__auth}
              onClick={signOutHandler}
            >
              <span>Sign out</span>
            </Link>
          ) : (
            <Link to="/login" className={styles.actions__auth}>
              <span> Sign in</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
