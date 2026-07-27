import { useState } from "react";

import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import styles from './App.module.css';
import { Header } from "./components/common/Header/Header";
import { Routes } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className={styles.container}>
      <Header></Header>
      <Routes>

      </Routes>
    </div>
  );
}

export default App;
