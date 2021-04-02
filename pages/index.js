import Head from "next/head";
import Feed from "../components/Feed";
import SideNav from "../components/SideNav";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Feed />
    </div>
  );
}
