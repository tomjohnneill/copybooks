import Head from "next/head";
import { useRouter } from "next/router";
import Book from "../../components/Book";
import { fetchData } from "../../lib/fetchData";

const EmbeddedSet = ({ set, params }) => {
  const {
    description,
    image,
    creator,
    creatorUsername,
    creatorAvatar,
    name,
    emoji,
    created,
  } = set || {};

  const { book_views: books } = set || {};

  const { query } = useRouter();

  return (
    <div className="w-full">
      <Head>
        <title>{name}</title>
        <meta name="description" content={description} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={name} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <meta property="og:title" content={name} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta
          property="og:url"
          content={`https://copybooks.app/set/` + set?.id}
        />
      </Head>
      {query.showImage && (
        <img src={image} className="w-full h-64 object-cover" />
      )}
      {!query?.hideTitle && (
        <h1 className="text-4xl font-bold my-4">
          {emoji} {name}
        </h1>
      )}

      {!query?.hideDescription && (
        <p className="opacity-80 mt-4 max-w-3xl">{description}</p>
      )}
      <div className="pt-4">
        {books?.map((book, i) => (
          <Book
            {...book.book}
            {...book}
            creator={creator}
            rank={i + 1}
            isRanked
            noEdit
            onDelete={(id) => handleDelete(id)}
            onEdit={(id) => {
              setFocusedBook(book);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true, // See the "fallback" section below
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const { setId } = params;

  const { error, set } = await fetchData(setId);
  if (error) console.log("error", error);

  return {
    props: { set: set?.[0] || {} }, // will be passed to the page component as props
  };
}

export default EmbeddedSet;
