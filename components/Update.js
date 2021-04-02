import Link from "next/link";

const Update = ({
  by,
  avatar,
  content,
  link,
  linkType,
  username,
  created,
  linkImage,
  linkTitle,
  linkDescription,
}) => {
  return (
    <div className="w-full flex border-b border-gray-200 p-4 ">
      <div className="flex">
        <img src={avatar} className="rounded-full h-12 mr-2" />
        <div>
          <div className="flex">
            <span className="font-bold pr-1">{by}</span>·
            <span className="opacity-80 px-1 font-light"> {username}</span>·
          </div>
          <div className="opacity-90">{content}</div>
          {link && (
            <Link href={link}>
              <a>
                <div className="rounded-2xl border border-gray-300 overflow-hidden mt-4 max-w-xl">
                  {linkImage && (
                    <img src={linkImage} className="w-full h-48 object-cover" />
                  )}
                  <div className="p-2">
                    <div>{linkTitle}</div>
                    <div className="opacity-80 font-light">
                      {linkDescription}
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Update;
