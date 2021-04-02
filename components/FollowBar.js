import Link from "next/link";

const topFollows = [
  {
    avatar:
      "https://pbs.twimg.com/profile_images/1101504816776470528/TXkjNsWH_bigger.png",
    name: "Tom Neill",
    username: "@tomjneill",
  },
];

const FollowBar = () => {
  return (
    <div className="min-h-screen border-l border-gray-200 p-4">
      <div className="bg-gray-100 rounded-lg p-4">
        <h1 className="font-bold text-2xl border-b border-gray-300 my-0 pb-2">
          Who to follow?
        </h1>
        {topFollows.map((person) => (
          <div className="flex mt-2 items-center">
            <img src={person.avatar} className="h-12 rounded-full mr-4" />
            <Link href="/profile/tomjneill">
              <a className="mr-4">
                <div className="font-bold leading-tight">{person.name}</div>
                <div className="opacity-70 leading-tight">
                  {person.username}
                </div>
              </a>
            </Link>
            <button className=" block bg-purple-500 text-white px-4 py-1 rounded-full">
              Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FollowBar;
