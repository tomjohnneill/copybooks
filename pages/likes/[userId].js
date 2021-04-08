import { useEffect, useState } from "react";
import { supabase } from "../../lib/initSupabase";
import SetPreview from "../../components/SetPreview";
import { useRouter } from "next/router";

const Likes = () => {
  const { userId } = useRouter().query;

  const [setList, setSetList] = useState([]);

  const fetchData = async () => {
    let { data: sets, error } = await supabase
      .from("likes")
      .select(
        `
        id,
        profiles (
          id
        ),
        sets (
          id,
          name,
          emoji,
          creator,
          description,
          image,
          likes (
            userId
          ),
          book_views (
            id
          )
        )
        
        
      `
      )
      .eq("userId", userId)
      .order("id", true);
    if (error) {
      alert(error.message);
    } else {
      console.log({ sets });
      setSetList(
        sets
          .filter((set) => set.sets.book_views.length > 0)
          .sort((a, b) => b.sets.likes?.length - a.sets.likes?.length)
      );
    }
  };

  useEffect(() => {
    if (userId) {
      fetchData();
    }
  }, [userId]);

  return (
    <div className="h-full flex-1 w-full max-w-8xl">
      <h1 className="my-0 p-4 border-b border-gray-200 text-2xl font-bold w-full">
        Sets you liked
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {setList.map((set, i) => (
          <SetPreview set={set.sets} index={i} />
        ))}
      </div>
    </div>
  );
};

export default Likes;
