import React from "react";
import styles from "./Navbar.module.scss";
import { ReactComponent as IconProfile } from "../../assets/Icons/navbar/profile.svg";
import { ReactComponent as IconUsers } from "../../assets/Icons/navbar/users.svg";
import { ReactComponent as IconWeather } from "../../assets/Icons/navbar/weather.svg";
import { ReactComponent as IconSettings } from "../../assets/Icons/navbar/settings.svg";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const isActive = ({ isActive }) => (isActive ? styles.active : "");
  return (
    <div className={styles.navbar}>
      <div className={styles.container}>
        <nav className={styles.menu}>
          <ul className={styles.menu__list}>
            <li className={styles.menu__item}>
              <NavLink to="/" className={isActive}>
                <IconProfile className={styles.menu__icon} />
                Profile
              </NavLink>
            </li>
            <li className={styles.menu__item}>
              <NavLink to="/users" className={isActive}>
                <IconUsers className={styles.menu__icon} />
                Users
              </NavLink>
            </li>
            <li className={styles.menu__item}>
              <NavLink to="/weather" className={isActive}>
                <IconWeather className={styles.menu__icon} />
                Weather
              </NavLink>
            </li>
            <li className={styles.menu__item}>
              <NavLink to="/settings" className={isActive}>
                <IconSettings className={styles.menu__icon} />
                Settings
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
