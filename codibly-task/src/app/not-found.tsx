import Link from "next/link";
import styles from "./page.module.css";

export default function NotFound() {
  return (
    <div className={styles.main}>
      <h1>Upsssss....</h1>
      <p>Something went wrong</p>
      <Link href="/">Click to go back - Home</Link>
    </div>
  );
}
