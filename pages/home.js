import { supabase } from "../lib/initSupabase";
import { Auth } from "@supabase/ui";
import { useEffect, useState } from "react";
import Head from "next/head";
import Feed from "../components/Feed";
import FollowBar from "../components/FollowBar";
import SideNav from "../components/SideNav";
import styles from "../styles/Home.module.css";

export default function Home() {
  //const user = supabase.auth.user();

  console.log("context auth", Auth.useUser());

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

  console.log({ user });

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex">
        {!user ? (
          <div className="w-full h-full flex justify-center items-center p-4">
            <Auth
              view="sign_up"
              supabaseClient={supabase}
              providers={[]}
              socialLayout="horizontal"
              socialButtonSize="xlarge"
            />
          </div>
        ) : (
          <>
            <Feed />
          </>
        )}

        <FollowBar />
      </div>
    </div>
  );
}
