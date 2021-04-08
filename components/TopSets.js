import { useEffect, useState } from "react";
import { supabase } from "../lib/initSupabase";
import SetPreview from "./SetPreview";

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
        creator,
        description,
        image,
        book_views (
          id
        ),
        likes (
          userId
        )
      `
      )
      .order("id", true);
    if (error) {
      alert(error.message);
    } else {
      setSetList(
        sets
          .filter((set) => set.book_views.length > 0)
          .sort((a, b) => b.likes?.length - a.likes?.length)
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return setList.map((set, i) => <SetPreview set={set} index={i} />);
};
export default TopSets;
