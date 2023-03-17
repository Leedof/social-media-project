import React from "react";
import styles from "./Navbar.module.scss";
import { ReactComponent as IconProfile } from "../../assets/Icons/navbar/profile.svg";
import { ReactComponent as IconUsers } from "../../assets/Icons/navbar/users.svg";
import { ReactComponent as IconSettings } from "../../assets/Icons/navbar/settings.svg";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const isActive = ({ isActive }) => (isActive ? styles.active : "");
  return (
    <div className={styles.navbar}>
      <div className={styles.container}>
        <nav className={styles.menu}>
          <ul>
            <li className={styles.item}>
              <NavLink to="/profile" className={isActive}>
                <IconProfile className={styles.icon} />
                <span className={styles.title}>Profile</span>
              </NavLink>
            </li>
            <li className={styles.item}>
              <NavLink to="/users" className={isActive}>
                <IconUsers className={styles.icon} />
                <span className={styles.title}>Users</span>
              </NavLink>
            </li>
            <li className={styles.item}>
              <NavLink to="/settings" className={isActive}>
                <IconSettings className={styles.icon} />
                <span className={styles.title}>Settings</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
