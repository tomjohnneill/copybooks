import { useEffect, useState } from "react";
import { supabase } from "../../lib/initSupabase";
import Book from "../../components/Book";
import { FaRegHeart, FaShareSquare, FaPlus } from "react-icons/fa";
import BookSearch from "../../components/BookSearch";
import Drawer from "../../components/Drawer";
import AddBook from "../../components/AddBook";

const fetchData = async (setId) => {
  let { data: set, error } = await supabase
    .from("sets")
    .select(
      `
      id,
      name,
      emoji,
      description,
      image,
      book_views (
        book,
        id
      )
    `
    )
    .eq("id", setId)
    .order("id", true);
  return { set, error };
};

const Set = (props) => {
  const [set, setSet] = useState(props.set);

  useEffect(() => {
    setSet(props.set);
  }, [props.set]);

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

  console.log({ set });

  const { book_views: books } = set || {};

  const [addBookVisible, setAddBookVisible] = useState(false);
  const handleAddBook = () => {
    setAddBookVisible(true);
  };

  const [updateCount, setUpdateCount] = useState(0);

  const updateData = async (setId) => {
    const { error, set } = await fetchData(setId);
    setSet(set?.[0]);
  };

  useEffect(() => {
    if (updateCount > 0) {
      updateData(set.id);
    }
  }, [updateCount]);

  const [focusedBook, setFocusedBook] = useState(null);
  useEffect(() => {
    if (focusedBook) {
      setAddBookVisible(true);
    }
  }, [focusedBook]);

  return (
    <div className="w-full ">
      {addBookVisible && (
        <Drawer
          title="New book details"
          handleClose={() => setAddBookVisible(false)}
        >
          <AddBook
            setId={set.id}
            onFinish={() => {
              setAddBookVisible(false);
              setUpdateCount(updateCount + 1);
            }}
          />
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

        <div className="pt-4">
          {books?.map((book, i) => (
            <Book
              {...book.book}
              {...book}
              rank={i + 1}
              isRanked
              onEdit={(id) => {
                setFocusedBook(id);
              }}
            />
          ))}
        </div>
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

  const { error, set } = await fetchData(setId);
  if (error) console.log("error", error);

  return {
    props: { set: set?.[0] || {} }, // will be passed to the page component as props
  };
}

export default Set;
