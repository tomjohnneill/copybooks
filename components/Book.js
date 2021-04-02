const Book = ({ rank, title, author_name, thumbnail, isRanked }) => {
  return (
    <div className="flex w-full">
      {isRanked && (
        <div className="text-6xl font-bold mr-4 opacity-80">{rank}</div>
      )}
      <div className="flex rounded-lg mb-4 border border-gray-200 overflow-hidden w-full">
        <img src={thumbnail} className="h-full w-20 object-cover" />
        <div className="p-4">
          <span className="font-bold pr-2">{title}</span>·
          <span className="pl-2 opacity-80">{author_name}</span>
        </div>
      </div>
    </div>
  );
};

export default Book;
