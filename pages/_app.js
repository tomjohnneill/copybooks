import "tailwindcss/tailwind.css";
import { useEffect, useState } from "react";
import { supabase } from "../lib/initSupabase";
import UserContext from "../lib/UserContext";
import SideNav from "../components/SideNav";
import styles from "../styles/Home.module.css";

function MyApp({ Component, pageProps }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = supabase.auth.session();
    setSession(session);
    setUser(session?.user ?? null);
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <UserContext.Provider
        value={{
          user,
          session,
        }}
      >
        <div className="flex flex-row min-h-screen ">
          {user?.id && <SideNav />}

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
      </UserContext.Provider>
    </>
  );
}

export default MyApp;
