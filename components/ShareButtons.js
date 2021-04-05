import { FaEnvelope, FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa";

const options = (link, text) => [
  {
    icon: <FaTwitter className="text-white text-2xl" />,
    name: "Twitter",
    link: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      link
    )}&text=${encodeURIComponent(text)}&via=tryCopybooks`,
    color: "#1DA1F2",
  },
  {
    icon: <FaWhatsapp className="text-white text-2xl" />,
    name: "WhatsApp",
    link: `https://api.whatsapp.com/send/?phone&text=${encodeURIComponent(
      link
    )}&app_absent=0`,
    color: "#25D366",
  },
  {
    icon: <FaEnvelope className="text-white text-2xl" />,
    name: "Email",
    link: `mailto:?body=${encodeURIComponent(link)}`,
    color: "#A9A9A9",
  },
  {
    icon: <FaFacebook className="text-white text-2xl" />,
    name: "Facebook",
    link: `https://www.facebook.com/dialog/share?href=${encodeURIComponent(
      link
    )}%26feature%3Dshare&display=popup`,
    color: "#4267B2",
  },
];

const ShareButtons = ({ link, text }) => {
  return options(link, text).map((option) => (
    <div className="mr-4 flex flex-col items-center">
      <a href={option.link} target="_blank" rel="noopener noreferrer">
        <div
          className="rounded-full h-12 w-12 flex items-center justify-center"
          style={{ backgroundColor: option.color }}
        >
          {option.icon}
        </div>
      </a>
      <span className="text-xs">{option.name}</span>
    </div>
  ));
};

export default ShareButtons;
