import Router from "next/router";
import { FaTrash } from "react-icons/fa";
import { supabase } from "../lib/initSupabase";
import Modal from "./Modal";

const DeleteSet = ({ setVisible, id }) => {
  const handleDelete = async () => {
    const { data, error } = await supabase.from("sets").delete().match({ id });
    if (error) {
      alert(error.message);
    } else {
      Router.push("/home");
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <Modal
      icon={<FaTrash className="text-white" />}
      iconBackground="bg-red-600"
      handleClose={handleCancel}
      title="Are you sure you want to delete this set?"
      actions={[
        <button
          onClick={handleDelete}
          type="button"
          class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        >
          Delete
        </button>,
        <button
          onClick={handleCancel}
          type="button"
          class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
        >
          Cancel
        </button>,
      ]}
    >
      This cannot be undone.
    </Modal>
  );
};

export default DeleteSet;
