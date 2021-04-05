import { supabase } from "./initSupabase";

export const fetchData = async (setId) => {
  let { data: set, error } = await supabase
    .from("sets")
    .select(
      `
      creator,
      id,
      name,
      emoji,
      description,
      image,
      book_views (
        book,
        id,
        rank
      )
    `
    )
    .eq("id", setId)
    .order("id", true);
  return { set, error };
};
