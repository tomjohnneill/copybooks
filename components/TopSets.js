import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../lib/initSupabase";

const TopSets = ({}) => {
  const [setList, setSetList] = useState([]);

  const fetchData = async () => {
    let { data: sets, error } = await supabase
      .from("sets")
      .select(
        `
        id,
        name,
        emoji,
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
            {set.emoji} {set.name}
          </div>
          <p className="font-light opacity-80">{set.description}</p>
        </div>
      </a>
    </Link>
  ));
};
export default TopSets;
