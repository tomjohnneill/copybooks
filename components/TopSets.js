import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { supabase } from "../lib/initSupabase";
import UserContext from "../lib/UserContext";

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
        image
      `
      )
      .order("id", true);
    if (error) {
      alert(error.message);
    } else {
      setSetList(sets);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return setList.map((set) => (
    <Link href={`/set/${set.id}`}>
      <a className="max-w-xl w-full rounded-lg overflow-hidden border border-gray-200">
        <img className="w-full h-32 object-cover" src={set.image} />
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
