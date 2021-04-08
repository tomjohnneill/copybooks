import { supabase } from "../lib/initSupabase";

const EditProfile = () => {
  const { user } = useContext(UserContext);

  const handleSave = () => {};

  return (
    <form onSubmit={handleSave}>
      <input placeholder="Name" />
    </form>
  );
};
