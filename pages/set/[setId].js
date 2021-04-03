import { useState } from "react";
import { supabase } from "../../lib/initSupabase";
import Book from "../../components/Book";
import { FaRegHeart, FaShareSquare, FaPlus } from "react-icons/fa";
import BookSearch from "../../components/BookSearch";
import Drawer from "../../components/Drawer";
import AddBook from "../../components/AddBook";

const dummySet = {};

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

const Set = (props) => {
  const { set } = props;

  const {
    description,
    image,
    creator,
    creatorUsername,
    creatorAvatar,
    name,
    emoji,
    created,
  } = set || {};

  const { book_views: books } = set || {};

  const [addBookVisible, setAddBookVisible] = useState(false);
  const handleAddBook = () => {
    setAddBookVisible(true);
  };

  return (
    <div className="w-full ">
      {addBookVisible && (
        <Drawer
          title="New book details"
          handleClose={() => setAddBookVisible(false)}
        >
          <AddBook />
        </Drawer>
      )}
      <img src={image} className="w-full h-64 object-cover" />
      <div className="py-4 px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-4xl font-bold my-4">
              {emoji} {name}
            </h1>
            <div className="ml-4">
              {!addBookVisible && (
                <button
                  onClick={handleAddBook}
                  className="flex items-center opacity-90 font-medium py-2 px-4 rounded-lg border border-gray-200 bg-purple-700 text-white hover:bg-purple-900 "
                >
                  <FaPlus className="mr-2" />
                  Add Book
                </button>
              )}
            </div>
          </div>
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
          {books?.map((book) => (
            <Book {...book.book} isRanked />
          ))}
        </div>
        <BookSearch />
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true, // See the "fallback" section below
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const { setId } = params;

  let { data: set, error } = await supabase
    .from("sets")
    .select(
      `
      name,
      emoji,
      description,
      image,
      book_views (
        book
      )
    `
    )
    .eq("id", setId)
    .order("id", true);
  if (error) console.log("error", error);

  return {
    props: { set: set?.[0] || {} }, // will be passed to the page component as props
  };
}

export default Set;
