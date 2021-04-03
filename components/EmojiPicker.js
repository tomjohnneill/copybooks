import dynamic from "next/dynamic";

const Picker = dynamic(() => import("emoji-picker-react"), {
  ssr: false,
});

const EmojiPicker = () => {
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };
  return (
    <>
      Pick emoji
      <div>
        {chosenEmoji ? (
          <span>You chose: {chosenEmoji.emoji}</span>
        ) : (
          <span>No emoji Chosen</span>
        )}
        <Picker onEmojiClick={onEmojiClick} />
      </div>
    </>
  );
};

export default EmojiPicker;
