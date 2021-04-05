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
          {user?.id &&
            typeof window !== "undefined" &&
            !window.location.href.includes("/embed") && <SideNav />}

          <main className="flex flex-col items-start flex-shrink flex-grow flex-1">
            <Component {...pageProps} />
          </main>
        </div>
        {typeof window !== "undefined" &&
          !window.location.href.includes("/embed") && (
            <footer className={styles.footer}>
              <a
                href="https://notfunatparties.substack.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://cdn.substack.com/image/fetch/w_256,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F49be2356-6491-4a6f-84a5-15e99d23b6d1_256x256.png"
                  alt="Vercel Logo"
                  className={styles.logo}
                />
                A "Not Fun at Parties" Production
              </a>
            </footer>
          )}
      </UserContext.Provider>
    </>
  );
}

export default MyApp;
