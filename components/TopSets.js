import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { supabase } from "../lib/initSupabase";
import UserContext from "../lib/UserContext";

const defaultImages = [
  "https://images.unsplash.com/photo-1513680592398-887abb03c760?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
  "https://images.unsplash.com/photo-1528227153184-d310240280ed?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
  "https://images.unsplash.com/photo-1596123068611-c89d922a0f0a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1022&q=80",
  "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1052&q=80",
];

const TopSets = ({}) => {
  const [setList, setSetList] = useState([]);

  const { user } = useContext(UserContext);

  const fetchData = async () => {
    let { data: sets, error } = await supabase
      .from("sets")
      .select(
        `
        id,
        name,
        emoji,
        creator,
        description,
        image,
        book_views (
          id
        )
      `,
        { count: "exact" }
      )
      .order("id", true);
    if (error) {
      alert(error.message);
    } else {
      console.log({ sets });
      setSetList(sets.filter((set) => set.book_views.length > 0));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return setList.map((set, i) => (
    <Link href={`/set/${set.id}`}>
      <a className="max-w-xl w-full rounded-lg overflow-hidden border border-gray-200">
        <img
          className="w-full h-32 object-cover"
          src={set.image || defaultImages[i % defaultImages.length]}
        />
        <div className="p-4">
          <div className="font-bold">
            {set.emoji} {set.name}{" "}
            {set.creator === user?.id && (
              <span className="inline-flex ml-2 items-center px-3 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                Yours
              </span>
            )}
          </div>
          <p className="font-light opacity-80">{set.description}</p>
        </div>
      </a>
    </Link>
  ));
};
export default TopSets;
