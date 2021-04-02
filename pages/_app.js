import "tailwindcss/tailwind.css";
import SideNav from "../components/SideNav";
import styles from "../styles/Home.module.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <div className="flex flex-row min-h-screen container">
        <SideNav />
        <main className="flex flex-col items-start flex-shrink flex-grow flex-1">
          <Component {...pageProps} />
        </main>
      </div>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </>
  );
}

export default MyApp;
