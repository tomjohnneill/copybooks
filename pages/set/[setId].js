import { useContext, useEffect, useState } from "react";
import copy from "copy-to-clipboard";
import { supabase } from "../../lib/initSupabase";
import Book from "../../components/Book";
import { FaRegHeart, FaShareSquare, FaPlus, FaEdit } from "react-icons/fa";
import BookSearch from "../../components/BookSearch";
import Drawer from "../../components/Drawer";
import AddBook from "../../components/AddBook";
import AddSet from "../../components/AddSet";
import Head from "next/head";
import UserContext from "../../lib/UserContext";
import Modal from "../../components/Modal";

const fetchData = async (setId) => {
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
    setFocusedBook(null);
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

  const [editSetVisible, setEditSetVisible] = useState(false);

  const handleDelete = async (id) => {
    const { data, error } = await supabase
      .from("book_views")
      .delete()
      .match({ id });
    if (error) {
      alert(error.message);
    } else {
      setUpdateCount(updateCount + 1);
    }
  };

  const { user } = useContext(UserContext);

  console.log({ user });

  const [shareVisible, setShareVisible] = useState(false);

  return (
    <div className="w-full">
      <Head>
        <title>{name}</title>
        <meta name="description" content={description} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={name} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <meta property="og:title" content={name} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta
          property="og:url"
          content={`https://copybooks.app/set/` + set?.id}
        />
      </Head>
      {shareVisible && (
        <Modal
          icon={<FaShareSquare />}
          title="Share"
          handleClose={() => setShareVisible(false)}
          actions={null}
        >
          <div>
            <div className="flex my-4">
              {["Embed", "Twitter", "WhatsApp", "Facebook", "Email"].map(
                (item) => (
                  <div className="mr-4 flex flex-col items-center">
                    <div className="rounded-full bg-purple-200 h-12 w-12"></div>
                    <span className="text-xs">{item}</span>
                  </div>
                )
              )}
            </div>
            <div className="text-xs bg-gray-100 p-2 flex">
              <input
                className="p-1 bg-gray-100 w-full mr-2"
                value={window.location.href}
              />
              <button
                className="text-blue-600 font-bold"
                onClick={() => copy(window.location.href)}
              >
                COPY
              </button>
            </div>
          </div>
        </Modal>
      )}
      {!editSetVisible && user?.id === creator && (
        <button
          onClick={() => setEditSetVisible(true)}
          className="absolute top-0 right-0 bg-white mt-4 mr-4 md:mt-8 md:mr-8 flex ml-2 items-center opacity-90 font-medium py-2 px-4 rounded-lg border border-gray-200 text-gray-800 hover:border-purple-400 hover:text-purple-700 "
        >
          <FaEdit className="mr-2" />
          Edit Set
        </button>
      )}
      {addBookVisible && (
        <Drawer
          title="New book details"
          handleClose={() => setAddBookVisible(false)}
        >
          <AddBook
            edit={focusedBook}
            setId={set.id}
            onFinish={() => {
              setAddBookVisible(false);
              setUpdateCount(updateCount + 1);
            }}
          />
        </Drawer>
      )}
      {editSetVisible && (
        <Drawer
          title="Edit set details"
          handleClose={() => setEditSetVisible(false)}
        >
          <AddSet
            existingSet={set}
            onFinish={() => {
              setEditSetVisible(false);
              setUpdateCount(updateCount + 1);
            }}
          />
        </Drawer>
      )}
      <img src={image} className="w-full h-64 object-cover" />
      <div className="py-4 px-4 md:px-8">
        <div className="md:flex justify-between items-center">
          <div className="md:flex items-center">
            <h1 className="text-4xl font-bold my-4">
              {emoji} {name}
            </h1>
            <div className="md:ml-4 flex">
              {!addBookVisible && user?.id === creator && (
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
          <div className="flex items-center justify-end md:justify-start">
            <button className="flex items-center opacity-90 font-medium py-2 px-4 rounded-lg border border-gray-200 text-gray-800 hover:border-purple-400 hover:text-purple-700">
              <FaRegHeart className="mr-2" />
              Like
            </button>
            <button
              onClick={() => {
                if (navigator.share && window.innerWidth < 736) {
                  navigator
                    .share({
                      url: window.location.href,
                    })
                    .then(() => {
                      console.log("Thanks for sharing!");
                    })
                    .catch(console.error);
                } else {
                  setShareVisible(true);
                }
              }}
              className="flex items-center opacity-90 font-medium py-2 px-4 rounded-lg border border-gray-200 text-gray-800 hover:border-purple-400 hover:text-purple-700 ml-2"
            >
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
              creator={creator}
              rank={i + 1}
              isRanked
              onDelete={(id) => handleDelete(id)}
              onEdit={(id) => {
                setFocusedBook(book);
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
