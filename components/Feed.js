import Update from "./Update";

const dummyPosts = [
  {
    by: "Tom Neill",
    username: "@tomjneill",
    avatar:
      "https://pbs.twimg.com/profile_images/1101504816776470528/TXkjNsWH_bigger.png",
    content: 'Added 6 books to the "Shipping, Trade and Geography" set',
    link: "",
    linkType: "",
  },
  {
    by: "Tom Neill",
    username: "@tomjneill",
    avatar:
      "https://pbs.twimg.com/profile_images/1101504816776470528/TXkjNsWH_bigger.png",
    content: 'Added 6 books to the "Shipping, Trade and Geography" set',
    link: "",
    linkType: "",
  },
  {
    by: "Tom Neill",
    username: "@tomjneill",
    avatar:
      "https://pbs.twimg.com/profile_images/1101504816776470528/TXkjNsWH_bigger.png",
    content: 'Added 6 books to the "Shipping, Trade and Geography" set',
    link: "/set/46c1418a-c5bb-4e60-89cf-ae4b80181e4e",
    linkType: "set",
    linkImage:
      "https://images.unsplash.com/photo-1550399105-c4db5fb85c18?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80",
    linkTitle: "Shipping, Trade and Geography",
    linkDescription: "asdfas dasdfasdfasd fasdf adsf sadf",
  },
];

const Feed = () => {
  return (
    <div className="h-full flex-1 w-full max-w-8xl">
      <h1 className="my-0 p-4 border-b border-gray-200 text-2xl font-bold w-full">
        Updates
      </h1>
      <div>
        {dummyPosts.map((post) => (
          <Update {...post} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
