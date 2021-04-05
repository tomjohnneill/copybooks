import { Container, Draggable } from "react-smooth-dnd";
import { useEffect, useState } from "react";
import Book from "./Book";
import { supabase } from "../lib/initSupabase";

const SetRankingEdit = (props) => {
  const {
    defaultBooks,
    setFocusedBook,
    updateCount,
    setUpdateCount,
    handleDelete,
  } = props;

  const [books, setBooks] = useState(defaultBooks);

  useEffect(() => {
    if (defaultBooks) {
      setBooks(defaultBooks);
    }
  }, [defaultBooks]);

  const updateRankingsInDatabase = async (rankings) => {
    const promises = rankings.map((book, i) =>
      supabase
        .from("book_views")
        .update({ rank: i + 1 })
        .match({ id: book.id })
    );
    Promise.all(promises)
      .then(() => {
        setUpdateCount(updateCount + 1);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const applyDrag = (action) => {
    const newRankings = books.slice();
    newRankings.splice(action.removedIndex, 1);
    newRankings.splice(action.addedIndex, 0, action.payload);
    setBooks(newRankings);
    updateRankingsInDatabase(newRankings);
  };

  const onDropSchema = (dropResult) => {
    applyDrag(dropResult);
  };

  return (
    <Container
      groupName="schema"
      style={{ height: "100%" }}
      onDrop={onDropSchema}
      dropPlaceholder={{
        animationDuration: 200,
        showOnTop: true,
        className:
          "schema-drag-preview border-2 border-dotted border-blue-200 rounded-lg",
      }}
      // important, this function is what passes the schema item to the "payload" property of dropResult
      getChildPayload={(index) => books[index]}
      // so that you won't accidentally drag when typing or interacting with inputs
      nonDragAreaSelector="input, select, .ant-select-selection__rendered"
    >
      {books?.map((book, i) => (
        <Draggable key={book.id}>
          <Book
            {...book.book}
            {...book}
            rank={i + 1}
            {...props}
            onDelete={(id) => handleDelete(id)}
            onEdit={(id) => {
              setFocusedBook(book);
            }}
          />
        </Draggable>
      ))}
    </Container>
  );
};

export default SetRankingEdit;
