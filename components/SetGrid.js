import Link from "next/link";

const dummySets = [
  {
    id: "setId",
    name: "Shipping and global trade",
    description:
      "Really good info if you want to know about trade. Especially relevant if you liked istheshipstillstuck.com",
    image: "https://istheshipstillstuck.com/ever-given.jpg",
  },
  {
    id: "setId",
    name: "Shipping and global trade",
    description:
      "Really good info if you want to know about trade. Especially relevant if you liked istheshipstillstuck.com",
    image: "https://istheshipstillstuck.com/ever-given.jpg",
  },
  {
    id: "setId",
    name: "🚢 Shipping and global trade",
    description:
      "Really good info if you want to know about trade. Especially relevant if you liked istheshipstillstuck.com",
    image: "https://istheshipstillstuck.com/ever-given.jpg",
  },
  {
    id: "setId",
    name: "🚢 Shipping and global trade",
    description:
      "Really good info if you want to know about trade. Especially relevant if you liked istheshipstillstuck.com",
    image: "https://istheshipstillstuck.com/ever-given.jpg",
  },
];

const SetGrid = () => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-3 gap-4 ">
        {dummySets.map((set) => (
          <Link href={`/set/${set.id}`}>
            <a className="max-w-xl w-full rounded-lg overflow-hidden border border-gray-200">
              <img className="w-full h-32 object-cover" src={set.image} />
              <div className="p-4">
                <div className="font-bold">{set.name}</div>
                <p className="font-light opacity-80">{set.description}</p>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SetGrid;
