import { Route, Routes } from "react-router-dom";

import styles from "./App.module.css";
import Header from "./components/common/Header/Header";
import Garage from "./components/Garage/Garage";
import Winners from "./components/Winners/Winners";

const App: React.FC = () => (
  <div className={styles.container}>
    <Header />
    <main>
      <Routes>
        <Route element={<Garage />} path="/" />
        <Route element={<Winners />} path="/winners" />
      </Routes>
    </main>
  </div>
);

export default App;
