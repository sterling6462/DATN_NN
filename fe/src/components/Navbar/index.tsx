import { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { MdOutlineTravelExplore } from "react-icons/md";
import { TbGridDots } from "react-icons/tb";

import clsx from "clsx";
import styles from "./style.module.scss";

const Navbar = () => {
  const [active, setActive] = useState(styles.navBar);

  //Functions to toggle navbar
  const showNav = () => {
    setActive(clsx(styles.navBar, styles.activeNavbar));
  };

  //Functions to remove navbar
  const removeNavbar = () => {
    setActive(styles.navBar);
  };

  return (
    <>
      <section className="navBarSection">
        <header className={clsx(styles.header, styles.flex)}>
          <div className="logoDiv">
            <a href="/#" className={clsx(styles.logo, styles.flex)}>
              <h1>
                <MdOutlineTravelExplore className={styles.icon} />
                Accommodation
              </h1>
            </a>
          </div>

          <div className={active}>
            <ul className={clsx(styles.navLists, styles.flex)}>
              <li className={styles.navItem}>
                <a href="/#" className={styles.navLink}>
                  Home
                </a>
              </li>

              <li className={styles.navItem}>
                <a href="/#" className={styles.navLink}>
                  Packages
                </a>
              </li>

              <li className={styles.navItem}>
                <a href="/#" className={styles.navLink}>
                  Staff
                </a>
              </li>

              <li className={styles.navItem}>
                <a href="/#" className={styles.navLink}>
                  About
                </a>
              </li>

              <li className={styles.navItem}>
                <a href="/#" className={styles.navLink}>
                  Pages
                </a>
              </li>

              <li className={styles.navItem}>
                <a href="/#" className={styles.navLink}>
                  News
                </a>
              </li>

              <li className={styles.navItem}>
                <a href="/#" className={styles.navLink}>
                  Contact
                </a>
              </li>

              <button className={styles.btn}>
                <a href="/#">BOOK NOW</a>
              </button>
            </ul>

            <div className={styles.closeNavbar} onClick={removeNavbar}>
              <AiFillCloseCircle className={styles.icon} />
            </div>
          </div>

          <div className={styles.toggleNavbar} onClick={showNav}>
            <TbGridDots className={styles.icon} />
          </div>
        </header>
      </section>
    </>
  );
};

export default Navbar;
