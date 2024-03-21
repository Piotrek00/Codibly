"use client";
import styles from "./page.module.css";
import App from "./components/App";
import ColorTable from "./components/ColorTable";
import { Pagination } from "@mui/material";

export default function Home() {
  return (
    <main className={styles.main}>
      <App />
      {/* <ColorTable /> */}
      {/* <Pagination /> */}
    </main>
  );
}
