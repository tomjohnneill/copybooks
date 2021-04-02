import { useState } from "react";
import Book from "../../components/Book";
import { FaRegHeart, FaShareSquare } from "react-icons/fa";

const dummySet = {
  description:
    "The books recommended on istheshipstillstuck.com. Great if you're interested in how the systems of trade and transport have affected human civilisation throughout history and today.",
  image: "https://istheshipstillstuck.com/ever-given.jpg",
  creator: "",
  creatorUsername: "",
  creatorAvatar: "",
  name: "Shipping, geography and trade.",
  created: "",
};

const books = [
  {
    author_name: "Geoffrey West",
    title: "Scale",
    rank: 1,
    thumbnail: "https://covers.openlibrary.org/b/id/8814864-L.jpg",
  },
  {
    author_name: "William J Bernstein",
    title: "A Splendid Exchange",
    rank: 2,
    thumbnail: "https://covers.openlibrary.org/b/id/5540145-L.jpg",
  },
];

const Set = () => {
  const [details, setDetails] = useState(dummySet);

  const {
    description,
    image,
    creator,
    creatorUsername,
    creatorAvatar,
    name,
    created,
  } = details;

  return (
    <div className="w-full ">
      <img src={image} className="w-full h-64 object-cover" />
      <div className="py-4 px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold my-4">🚢 {name}</h1>
          <div className="flex items-center">
            <button className="flex items-center opacity-90 font-medium py-2 px-4 rounded-lg border border-gray-200 text-gray-800 hover:border-purple-400 hover:text-purple-700">
              <FaRegHeart className="mr-2" />
              Like
            </button>
            <button className="flex items-center opacity-90 font-medium py-2 px-4 rounded-lg border border-gray-200 text-gray-800 hover:border-purple-400 hover:text-purple-700 ml-2">
              <FaShareSquare className="mr-2" /> Share
            </button>
          </div>
        </div>
        <p className="opacity-80 mt-4 max-w-3xl">{description}</p>
        <h3 className="pt-8 opacity-80 font-light text-xl">
          Books in this set
        </h3>
        <div className="pt-4">
          {books.map((book) => (
            <Book {...book} isRanked />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Set;
