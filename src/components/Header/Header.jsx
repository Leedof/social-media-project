import React from "react";
import styles from "./Header.module.scss";

import Logo from "../../assets/images/logo.svg";
import profileImage from "../../assets/images/profile.jpg";
import logout from "../../assets/Icons/auth/logout.svg";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.сontainer}>
        <div className={styles.logo}>
          <img src={Logo} alt="logo" />
        </div>
        <div className={styles.actions}>
          <div className={styles.actions__profile}>
            <img src={profileImage} alt="profile" width={45} height={45} />
          </div>
          <a href="" className={styles.actions__auth}>
            <img src={logout} alt="logout" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
