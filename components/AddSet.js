import { useState, useEffect, useContext } from "react";
import dynamic from "next/dynamic";
import { supabase } from "../lib/initSupabase";
import UserContext from "../lib/UserContext";

const Picker = dynamic(() => import("./EmojiPicker"), {
  ssr: false,
});

const AddSet = ({ existingSet, onFinish }) => {
  const [details, setDetails] = useState(existingSet || {});

  const { user } = useContext(UserContext);

  const handleSave = async (e) => {
    const { book_views, ...rest } = details;

    e.preventDefault();
    const { data, error } = existingSet
      ? await supabase
          .from("sets")
          .update([{ ...rest, creator: user.id }])
          .match({ id: existingSet.id })
      : await supabase.from("sets").insert([{ ...rest, creator: user.id }]);
    if (!error) {
      if (onFinish) {
        onFinish(data);
      }
    } else {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSave}>
      <div className="flex">
        <div className="mr-4">
          <label>Emoji</label>
          <Picker
            defaultEmoji={details.emoji}
            onChange={(emoji) => setDetails({ ...details, emoji })}
          />
        </div>
        <div>
          <label>Set Name</label>
          <input
            onChange={(e) => setDetails({ ...details, name: e.target.value })}
            value={details.name}
            placeholder="do the thing"
            className="border p-2 rounded border-gray-200 block"
          />
        </div>
      </div>
      <img
        src={details.image}
        className="h-48 rounded my-2 w-full object-cover"
      />
      <label>
        Cover Image URL (try{" "}
        <a
          className="underline"
          href={`https://unsplash.com/s/photos/${details.name
            ?.toLowerCase()
            ?.replace("books", "")
            ?.trim()}?orientation=landscape`}
          target="_blank"
          rel="noopener noreferrer"
        >
          unsplash
        </a>
        )
      </label>
      <input
        value={details.image}
        onChange={(e) => setDetails({ ...details, image: e.target.value })}
        placeholder="Cover Image URL"
        className="border p-2 rounded border-gray-200 block w-full mb-2"
      />
      <label>Set Description</label>
      <textarea
        rows={3}
        className="border p-2 rounded border-gray-200 block w-full mb-4"
        value={details.description}
        onChange={(e) =>
          setDetails({ ...details, description: e.target.value })
        }
      />
      <button
        htmlType="submit"
        className="w-full py-2 rounded-full bg-purple-700 text-white font-bold text-md"
      >
        Save Set
      </button>
    </form>
  );
};

export default AddSet;
