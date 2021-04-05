import copy from "copy-to-clipboard";
import { useState } from "react";
import Modal from "./Modal";

const EmbedOptions = ({ id, handleClose }) => {
  const [showTitle, setShowTitle] = useState(true);
  const [showImage, setShowImage] = useState(false);
  const [showDescription, setShowDescription] = useState(true);

  const generateIframeLink = () => {
    let baseLink = `${window.location.origin}/embed/${id}`;

    const options = [];

    if (!showTitle) {
      options.push(`hideTitle=true`);
    }
    if (showImage) {
      options.push(`showImage=true`);
    }
    if (!showDescription) {
      options.push(`hideDescription=true`);
    }
    if (options?.length > 0) {
      baseLink = `${baseLink}?`;
      options.forEach((opt) => {
        baseLink = `${baseLink}${opt}&`;
      });
      baseLink = baseLink.slice(0, baseLink.length - 1);
    }
    return baseLink;
  };

  const iframeCode = `<iframe width="300" height="600" src="${generateIframeLink()}" title="Copybooks book recommendations" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

  return (
    <Modal contentClassName="lg:max-w-3xl" handleClose={handleClose}>
      <div className="flex w-full">
        <div className=" mr-4 flex-1">
          <h2 className="border-b border-gray-200 py-2 mb-4 w-full">
            This is what it looks like
          </h2>
          <div className="p-2 shadow">
            <iframe
              width="300"
              height="600"
              src={generateIframeLink()}
              title="Copybooks book recommendations"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
        <div className="flex-1">
          <h2 className="border-b border-gray-200 py-2 mb-4 w-full">
            Embed this book set
          </h2>
          <textarea
            rows={7}
            className="border border-gray-200 p-1 w-full text-sm"
            value={iframeCode}
          />
          <h2 className="border-b border-gray-200 py-2 mb-4 w-full">Options</h2>
          <div className="flex items-center mb-2">
            <input
              id="show_cover_image"
              name="show_cover_image"
              checked={showImage}
              onChange={(e) => setShowImage(!showImage)}
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label
              htmlFor="show_cover_image"
              className="ml-2 block text-sm text-gray-900"
            >
              Show Cover Image
            </label>
          </div>
          <div className="flex items-center mb-2">
            <input
              id="show_title"
              name="show_title"
              checked={showTitle}
              onChange={(e) => setShowTitle(!showTitle)}
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label
              htmlFor="show_title"
              className="ml-2 block text-sm text-gray-900"
            >
              Show Title
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="show_description"
              name="show_description"
              checked={showDescription}
              onChange={(e) => setShowDescription(!showDescription)}
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label
              htmlFor="show_description"
              className="ml-2 block text-sm text-gray-900"
            >
              Show Description
            </label>
          </div>

          <button
            onClick={() => copy(iframeCode)}
            className="bg-purple-700 opacity-90 text-white rounded-full font-bold py-2 px-4 float-right mt-2"
          >
            Copy
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EmbedOptions;
