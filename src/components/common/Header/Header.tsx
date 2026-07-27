import { NavLink } from "react-router-dom";
import styles from './Header.module.css'
import { Container } from "../Container/Container";

export function Header() {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.wrapper}>
          <h1>Async Race</h1>
          <nav className={styles.nav}>
            <NavLink to='/' className={styles.navLink}>Garage</NavLink>
            <NavLink to='/' className={styles.navLink}>Winners</NavLink>
          </nav>
        </div>
      </Container>
    </header>
  );
}
