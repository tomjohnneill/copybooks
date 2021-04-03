import React, { useEffect, useState } from "react";
import { Select } from "@supabase/ui";
import { useDebounce } from "use-debounce";

const BookSearch = ({ onSelect }) => {
  const [inputItems, setInputItems] = useState([]);
  const [searchValue, setSearchValue] = useState([]);

  const [debouncedText] = useDebounce(searchValue, 200);
  useEffect(() => {
    if (debouncedText?.length > 0) {
      let ignore = false;
      console.log({ debouncedText });
      fetch(
        `https://openlibrary.org/search.json?q=${debouncedText.replace(
          / /g,
          "+"
        )}`
      )
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            console.log({ response });
          }
        })
        .then((result) => {
          console.log({ result });
          setInputItems(result.docs?.slice(0, 10));
        });
      return () => {
        ignore = true;
      };
    }
  }, [debouncedText]);

  console.log({ inputItems });

  const handleSelect = (item) => {
    setInputItems([]);
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <form>
      <label>Look up a book:</label>

      <input
        type="text"
        className="border border-gray-200 rounded block p-2"
        placeholder="Search books"
        aria-label="search"
        onChange={(e) => setSearchValue(e.target.value)}
        autoComplete="off"
      />
      <div>
        <ul role="listbox">
          {inputItems.map((item) => (
            <li
              className="flex my-2 cursor-pointer"
              onClick={() => handleSelect(item)}
            >
              {
                <img
                  className="w-12 h-16 bg-gray-200 mr-2 border border-gray-100 object-cover"
                  src={`https://covers.openlibrary.org/b/isbn/${item.isbn?.[0]}-S.jpg`}
                />
              }
              <div>
                <p>
                  <b>{item.title}</b>, {item.author_name?.[0]}
                </p>
                <p>{item.first_publish_year}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </form>
  );
};

export default BookSearch;
