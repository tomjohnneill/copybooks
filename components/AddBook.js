import { useContext, useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { supabase } from "../lib/initSupabase";
import { bookLinkTypes, bookShopLogos } from "../lib/bookLinkTypes";
import BookSearch from "./BookSearch";
import { useRouter } from "next/router";
import UserContext from "../lib/UserContext";

const bestISBN = (isbn) => {
  if (!isbn || !isbn[0]) {
    return null;
  } else {
    let best = isbn[0];
    let counter = 1;
    while (best.length !== 13 && counter < isbn.length) {
      best = isbn[counter];
      counter += 1;
    }
    return best;
  }
};

const AddBook = ({ setId, onFinish, edit }) => {
  const [details, setDetails] = useState(edit?.book || {});
  const [bookKey, setBookKey] = useState(null);
  const [bookPicked, setBookPicked] = useState(edit ? true : false);

  const handleBookLookup = (item) => {
    setBookPicked(true);
    const { author_name, title, isbn, key, edition_key } = item;
    setBookKey(key);
    const image = `https://covers.openlibrary.org/b/isbn/${bestISBN(
      isbn
    )}-M.jpg`;
    const imageExists = image ? true : false;
    setDetails({
      author_name,
      title,
      isbn,
      edition_key,
      image,
    });
  };

  const { locale } = useRouter();

  const { user } = useContext(UserContext);

  const [selectedLocale, setSelectedLocale] = useState(locale);

  const [purchaseLinks, setPurchaseLinks] = useState(edit?.book?.purchaseLinks);

  const handleDetailChange = ({ field, value }) => {
    setDetails({ ...details, [field]: value });
  };

  useEffect(() => {
    if (details.edition_key?.length > 0) {
      fetch(`https://openlibrary.org/books/${details.edition_key[0]}.json`)
        .then((response) => response.json())
        .then((data) => {
          if (data.subtitle) {
            setDetails({ ...details, subtitle: data.subtitle });
          }
        });
    }
  }, [details.edition_key]);

  const handleSave = async (e) => {
    e.preventDefault();
    const { data, error } = edit
      ? await supabase
          .from("book_views")
          .update([
            {
              creator: user.id,
              set_id: setId,
              book: { ...details, purchaseLinks },
            },
          ])
          .match({ id: edit.id })
      : await supabase.from("book_views").insert([
          {
            creator: user.id,
            set_id: setId,
            book: { ...details, purchaseLinks },
          },
        ]);
    if (!error) {
      onFinish();
    } else {
      alert(error.message);
    }
  };

  useEffect(() => {
    if (!edit?.book?.purchaseLinks) {
      setPurchaseLinks(bookLinkTypes(bestISBN(details.isbn)));
    }
  }, [details?.isbn]);

  const updateLink = ({ shop, locale, value }) => {
    setPurchaseLinks({
      ...purchaseLinks,
      [locale]: {
        ...purchaseLinks[locale],
        [shop]: value,
      },
    });
  };

  console.log({ purchaseLinks });

  return (
    <form onSubmit={handleSave}>
      {!bookPicked ? (
        <>
          <BookSearch onSelect={handleBookLookup} />
          <p className="w-full text-center my-4">or</p>
          <button
            onClick={(e) => {
              e.preventDefault();
              setBookPicked(true);
            }}
            className="w-full py-2 rounded-full bg-purple-700 text-white font-bold text-md"
          >
            Add details manually
          </button>
        </>
      ) : (
        <>
          <button
            onClick={(e) => {
              e.preventDefault();
              setBookPicked(false);
            }}
            className="border border-gray-200 rounded-full text-gray-800 mb-2 px-4 py-1 flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back
          </button>
          <div className="grid grid-cols-2 gap-4 mb-2">
            <div>
              <label>Title</label>
              <input
                placeholder="Title"
                className="border border-gray-200 p-2 rounded block w-full"
                name="title"
                value={details.title}
                onChange={(e) =>
                  handleDetailChange({ field: "title", value: e.target.value })
                }
              />
            </div>
            <div>
              <label>Author Name:</label>
              <input
                placeholder="Author Name"
                className="border border-gray-200 p-2 rounded block w-full"
                name="title"
                value={details.author_name}
                onChange={(e) =>
                  handleDetailChange({
                    field: "author_name",
                    value: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div>
            <label>Subtitle</label>
            <input
              placeholder="Subtitle"
              className="border border-gray-200 p-2 rounded block w-full"
              name="title"
              value={details.subtitle}
              onChange={(e) =>
                handleDetailChange({ field: "subtitle", value: e.target.value })
              }
            />
          </div>

          <div className="my-4 flex">
            <img
              className=" bg-gray-200 mr-2 border border-gray-100 object-cover h-32 w-auto"
              src={details.image}
            />
            <div className="flex-1">
              <label>Image Link</label>
              <input
                placeholder="Image Link"
                className="border border-gray-200 p-2 rounded block w-full"
                name="image"
                value={details.image}
                onChange={(e) =>
                  handleDetailChange({ field: "image", value: e.target.value })
                }
              />
            </div>
          </div>
          <p>
            Purchase links{" "}
            {bestISBN(details.isbn) &&
              "- these are often a bit iffy, it's sensible to check."}
          </p>

          <div className="grid grid-cols-2 gap-4 py-2 w-full">
            {Object.keys(bookLinkTypes(details.isbn?.[0])[locale]).map(
              (shop) => (
                <div className="flex items-center">
                  <a
                    href={purchaseLinks[locale][shop]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={bookShopLogos[shop]} className="h-12 mr-4" />
                  </a>
                  <input
                    onChange={(e) =>
                      updateLink({
                        shop,
                        locale: selectedLocale,
                        value: e.target.value,
                      })
                    }
                    className="flex-1 block border border-gray-200 rounded p-2"
                    value={purchaseLinks[locale][shop]}
                  />
                </div>
              )
            )}
          </div>
          <label>Your Recommendation:</label>
          <textarea
            placeholder="Why you would recommend this book?"
            className="border border-gray-200 p-2 rounded w-full mb-2"
            name="title"
            rows={3}
            value={details.comment}
            onChange={(e) =>
              handleDetailChange({ field: "comment", value: e.target.value })
            }
          ></textarea>
          <button
            htmlType="submit"
            className="w-full py-2 rounded-full bg-purple-700 text-white font-bold text-md"
          >
            Save Book
          </button>
        </>
      )}
    </form>
  );
};

export default AddBook;
