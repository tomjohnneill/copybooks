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
      <Head>
        <title>Copybooks</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@tryCopybooks" />
        <meta name="twitter:creator" content="@tomjneill" />
        <meta
          name="twitter:title"
          content="Copybooks - Book recommendations from real people"
        />
        <meta
          name="twitter:description"
          content="Book recommendations from real people, not robots."
        />
        <meta
          name="twitter:image"
          content="https://www.copybooks.app/social-card.png"
        />
        <meta
          property="og:image"
          content="https://www.copybooks.app/social-card.png"
        />
        <meta name="twitter:image:alt" content="Bookshelf" />
        <meta
          property="og:description"
          content="Book recommendations from real people, not robots."
        />
        <meta property="og:title" content="Copybooks" />
        <meta property="og:url" content={"https://www.copybooks.app"} />
      </Head>
      <div className="flex min-h-screen w-full">
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
        {/*
        <FollowBar />
        */}
      </div>
    </>
  );
}
