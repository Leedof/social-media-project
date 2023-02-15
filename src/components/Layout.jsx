import React from "react";
import styles from "./Layout.module.scss";
import Navbar from "./Navbar/Navbar";
import { Outlet } from "react-router-dom";
import HeaderContainer from "./Header/HeaderContainer";

const Layout = () => {
  return (
    <div className={styles.appWrapper}>
      <HeaderContainer />
      <Navbar />
      <main className={styles.mainSection}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
