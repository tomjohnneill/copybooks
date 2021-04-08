import { useContext, useEffect, useState } from "react";
import copy from "copy-to-clipboard";
import { supabase } from "../../lib/initSupabase";
import Book from "../../components/Book";
import {
  FaRegHeart,
  FaShareSquare,
  FaPlus,
  FaEdit,
  FaCode,
  FaTrash,
  FaHeart,
} from "react-icons/fa";
import Drawer from "../../components/Drawer";
import AddBook from "../../components/AddBook";
import AddSet from "../../components/AddSet";
import Head from "next/head";
import UserContext from "../../lib/UserContext";
import Modal from "../../components/Modal";
import ShareButtons from "../../components/ShareButtons";
import { fetchData } from "../../lib/fetchData";
import EmbedOptions from "../../components/EmbedOptions";
import SetRankingEdit from "../../components/SetRankingEdit";
import DeleteSet from "../../components/DeleteSet";

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

  const { book_views: books } = set || {};
  books?.sort((a, b) => a.rank - b.rank);

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
    console.log(`should be deleting ${id}`);

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

  const liked = set?.likes?.map((item) => item.userId)?.includes(user?.id);

  const handleLike = async () => {
    if (user?.id) {
      if (liked) {
        const { data, error } = await supabase
          .from("likes")
          .delete()
          .match({ userId: user?.id });
        if (error) {
          alert(error.message);
        } else {
          setUpdateCount(updateCount + 1);
        }
      } else {
        const { data, error } = await supabase.from("likes").insert([
          {
            setId: set.id,
            userId: user?.id,
          },
        ]);
        if (error) {
          alert(error.message);
        } else {
          setUpdateCount(updateCount + 1);
        }
      }
    }
  };

  console.log({ set });

  const [shareVisible, setShareVisible] = useState(false);
  const [embedVisible, setEmbedVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);

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
      {deleteVisible && (
        <DeleteSet setVisible={setDeleteVisible} id={set?.id} />
      )}
      {embedVisible && (
        <EmbedOptions id={set.id} handleClose={() => setEmbedVisible(false)} />
      )}
      {shareVisible && (
        <Modal
          icon={<FaShareSquare />}
          title="Share"
          handleClose={() => setShareVisible(false)}
          actions={null}
        >
          <div>
            <div className="flex my-4">
              {["Embed"].map((item) => (
                <button
                  className="mr-4 flex flex-col items-center cursor-pointer"
                  onClick={() => {
                    setShareVisible(false);
                    setEmbedVisible(true);
                  }}
                >
                  <div className="rounded-full bg-purple-700 h-12 w-12 flex items-center justify-center">
                    <FaCode className="text-white text-2xl" />
                  </div>
                  <span className="text-xs">{item}</span>
                </button>
              ))}
              <ShareButtons
                link={window.location.href}
                text={description || "I'd recommend these books: "}
              />
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
      {user?.id === creator && (
        <div className="absolute top-0 right-0 mt-4 mr-4 md:mt-8 md:mr-8 flex">
          <button
            onClick={() => setDeleteVisible(true)}
            className=" bg-white flex ml-2 items-center opacity-90 font-medium py-2 px-4 rounded-lg border border-gray-200 text-gray-800 hover:border-red-400 hover:text-red-700 "
          >
            <FaTrash className="mr-2" />
            Delete Set
          </button>
          {!editSetVisible && (
            <button
              onClick={() => setEditSetVisible(true)}
              className="bg-white  flex ml-2 items-center opacity-90 font-medium py-2 px-4 rounded-lg border border-gray-200 text-gray-800 hover:border-purple-400 hover:text-purple-700 "
            >
              <FaEdit className="mr-2" />
              Edit Set
            </button>
          )}
        </div>
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
            <button
              onClick={handleLike}
              className={`flex items-center opacity-90 font-medium py-2 px-4 rounded-lg border 
              ${
                liked
                  ? "text-purple-700 border-purple-400"
                  : "text-gray-800 border-gray-200"
              } hover:border-purple-400 hover:text-purple-700`}
            >
              {liked ? (
                <FaHeart className="mr-2 text-purple-700" />
              ) : (
                <FaRegHeart className="mr-2" />
              )}
              {set?.likes?.length} Like{set?.likes?.length === 1 ? "" : "s"}
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
          {user?.id === creator ? (
            <SetRankingEdit
              setUpdateCount={setUpdateCount}
              updateCount={updateCount}
              defaultBooks={books}
              handleDelete={(id) => handleDelete(id)}
              setFocusedBook={setFocusedBook}
              isRanked
              creator={creator}
            />
          ) : (
            books?.map((book, i) => (
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
            ))
          )}
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
    revalidate: 120,
    props: { set: set?.[0] || {} }, // will be passed to the page component as props
  };
}

export default Set;
