import dynamic from "next/dynamic";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

const Picker = dynamic(() => import("emoji-picker-react"), {
  ssr: false,
});

const EmojiPicker = ({ defaultEmoji, onChange }) => {
  const [chosenEmoji, setChosenEmoji] = useState(
    defaultEmoji ? { emoji: defaultEmoji } : null
  );

  const [pickerOpen, setPickerOpen] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    console.log({ emojiObject });
    setChosenEmoji(emojiObject);
    onChange(emojiObject.emoji);
    setPickerOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="p-2 border border-gray-200 rounded flex items-center justify-center"
        onClick={(e) => {
          e.preventDefault();
          setPickerOpen(true);
        }}
      >
        {chosenEmoji ? (
          <span>{chosenEmoji.emoji}</span>
        ) : (
          <span>
            <FaPlus />
          </span>
        )}
      </button>
      {pickerOpen && (
        <div className="absolute z-30">
          <Picker onEmojiClick={onEmojiClick} emoji={chosenEmoji.emoji} />
        </div>
      )}
    </div>
  );
};

export default EmojiPicker;
