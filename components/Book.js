import { useContext } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import UserContext from "../lib/UserContext";

const Book = ({
  id,
  rank,
  creator,
  title,
  author_name,
  image,
  noEdit,
  isRanked,
  subtitle,
  comment,
  onEdit,
  onDelete,
}) => {
  console.log({ creator });

  const { user } = useContext(UserContext);

  return (
    <a href="#" target="_blank" rel="noopener noreferrer">
      <div className="flex w-full">
        {isRanked && (
          <div className="text-2xl md:text-6xl font-bold mr-4 opacity-80">
            {rank}
          </div>
        )}
        <div className="flex justify-between rounded-lg mb-4 border border-gray-200 overflow-hidden w-full">
          <div className="flex">
            <img src={image} className="h-full w-20 object-cover" />
            <div className="p-4">
              <span className="font-bold pr-2">
                {title}{" "}
                {subtitle && (
                  <span className="font-light">{`- ${subtitle}`}</span>
                )}
              </span>
              ·
              <span className="pl-2 opacity-80">
                {Array.isArray(author_name)
                  ? author_name.join(", ")
                  : author_name}
              </span>
              <p className="mt-2">{comment}</p>
            </div>
          </div>
          {user?.id === creator && !noEdit && (
            <div className="block">
              <div className="flex">
                <button
                  className="border border-gray-200 rounded flex items-center px-2 ml-2 mt-2 
                py-1 hover:border-red-400 focus:border-red-400  hover:text-red-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    if (onDelete) {
                      onDelete(id);
                    }
                  }}
                >
                  {" "}
                  <FaTrash className="mr-2" /> Delete
                </button>
                <button
                  className="border border-gray-200 rounded flex items-center px-2 mx-2 mt-2 py-1 hover:border-purple-400 focus:border-purple-400  hover:text-purple-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    if (onEdit) {
                      onEdit(id);
                    }
                  }}
                >
                  {" "}
                  <FaEdit className="mr-2" /> Edit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </a>
  );
};

export default Book;
