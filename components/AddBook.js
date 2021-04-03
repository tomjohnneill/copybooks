import { useEffect, useState } from "react";
import { bookLinkTypes, bookShopLogos } from "../lib/bookLinkTypes";
import BookSearch from "./BookSearch";

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

const AddBook = () => {
  const [details, setDetails] = useState({});
  const [bookKey, setBookKey] = useState(null);

  const handleBookLookup = (item) => {
    const { author_name, title, isbn, key, edition_key } = item;
    setBookKey(key);
    setDetails({ author_name, title, isbn, edition_key });
  };

  const handleDetailChange = ({ field, value }) => {
    setDetails({ ...details, [field]: value });
  };

  useEffect(() => {
    if (details.edition_key?.length > 0) {
      fetch(`https://openlibrary.org/books/${details.edition_key[0]}.json`)
        .then((response) => response.json())
        .then((data) => {
          console.log({ data });
          if (data.subtitle) {
            setDetails({ ...details, subtitle: data.subtitle });
          }
        });
    }
  }, [details.edition_key]);

  console.log(bookLinkTypes("asdfasdf").uk);

  return (
    <form>
      {!details.title && <BookSearch onSelect={handleBookLookup} />}

      <div>
        <label>Book Title</label>
        <input
          placeholder="Book Title"
          className="border border-gray-200 p-2 rounded"
          name="title"
          value={details.title}
          onChange={(e) =>
            handleDetailChange({ field: "title", value: e.target.value })
          }
        />
      </div>
      <div>
        <label>Subtitle</label>
        <input
          placeholder="Book Title"
          className="border border-gray-200 p-2 rounded block w-full"
          name="title"
          value={details.subtitle}
          onChange={(e) =>
            handleDetailChange({ field: "subtitle", value: e.target.value })
          }
        />
      </div>
      <div>
        <label>Author Name:</label>
        <input
          placeholder="Author Name"
          className="border border-gray-200 p-2 rounded"
          name="title"
          value={details.author_name}
          onChange={(e) =>
            handleDetailChange({ field: "author_name", value: e.target.value })
          }
        />
      </div>
      <div>
        <img
          className=" bg-gray-200 mr-2 border border-gray-100 object-cover"
          src={`https://covers.openlibrary.org/b/isbn/${details.isbn?.[0]}-M.jpg`}
        />
      </div>
      <p>
        Purchase links - these are often a bit iffy, it's sensible to check.
      </p>
      <div className="flex py-2">
        {Object.keys(bookLinkTypes(details.isbn?.[0]).uk).map((shop) => (
          <a
            href={bookLinkTypes(bestISBN(details.isbn)).uk[shop]}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={bookShopLogos[shop]} className="h-12 mr-4" />
          </a>
        ))}
      </div>
      <label>Your Recommendation:</label>
      <textarea
        placeholder="Why you would recommend this book?"
        className="border border-gray-200 p-2 rounded w-full"
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
    </form>
  );
};

export default AddBook;
