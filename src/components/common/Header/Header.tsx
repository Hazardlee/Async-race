import { NavLink } from "react-router-dom";

import styles from "./Header.module.css";
import Container from "../Container/Container";

const Header: React.FC = () => (
  <header className={styles.header}>
    <Container>
      <div className={styles.wrapper}>
        <h1>Async Race</h1>
        <nav className={styles.nav}>
          <NavLink className={styles.navLink} to="/">
            Garage
          </NavLink>
          <NavLink className={styles.navLink} to="/">
            Winners
          </NavLink>
        </nav>
      </div>
    </Container>
  </header>
);

export default Header;
