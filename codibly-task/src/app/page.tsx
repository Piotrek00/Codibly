"use client";
import styles from "./page.module.css";
import App from "./components/App";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className={styles.main}>
      <Suspense>
        <App />
      </Suspense>
    </main>
  );
}
