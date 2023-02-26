import React from "react";
import styles from "./Layout.module.scss";
import Header from "./Header/Header";
import Navbar from "./Navbar/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className={styles.appWrapper}>
      <Header />
      <Navbar />
      <main className={styles.mainSection}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
