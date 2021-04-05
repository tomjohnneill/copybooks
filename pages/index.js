import Head from "next/head";
import { supabase } from "../lib/initSupabase";
import { Auth } from "@supabase/ui";
import styles from "../styles/Home.module.css";
import { useContext, useEffect } from "react";
import UserContext from "../lib/UserContext";
import Router from "next/router";
import TopSets from "../components/TopSets";

export default function Home() {
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user?.id) {
      Router.push("/home");
    }
  }, [user]);

  return (
    <div className="md:flex w-full">
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

      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold">Copybooks</h1>
        <h2 className="text-xl opacity-80 my-4">
          Books recommended by real people, not Amazon's robots
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-4">
          <TopSets />
        </div>
      </div>
      <div className="w-full max-w-md md:h-screen">
        <div className="md:fixed top-0 right-0 border-l border-gray-200 bg-white z-50 md:h-screen flex flex-col justify-center p-8 w-full max-w-md">
          <h2 className="font-bold text-3xl ">
            <span className="opacity-80 font-light">
              All these books are crap?
            </span>
            <br />
            <br />
            Sign up. Make your own recommendations.
          </h2>
          <Auth
            view="sign_up"
            supabaseClient={supabase}
            providers={[]}
            socialLayout="horizontal"
            socialButtonSize="xlarge"
          />
        </div>
      </div>
    </div>
  );
}
