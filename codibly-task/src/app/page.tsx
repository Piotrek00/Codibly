"use client";
import styles from "./page.module.css";
import Search from "./components/Search";
import ColorTable from "./components/ColorTable";

export default function Home() {
  return (
    <main className={styles.main}>
      <Search />
      {/* <ColorTable /> */}
    </main>
  );
}
