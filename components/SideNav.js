import Router from "next/router";
import Link from "next/link";
import { useContext, useState } from "react";
import AddSet from "./AddSet";
import Drawer from "./Drawer";
import UserContext from "../lib/UserContext";

const SideNav = () => {
  const { user } = useContext(UserContext);

  const links = [
    {
      name: "Your Book Sets",
      url: `/profile/${user?.id}`,
      icon: (
        <svg
          className="text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
    },
  ];

  const [addSet, setAddSet] = useState(false);

  return (
    <>
      <nav className="block md:hidden fixed bottom-0 w-full z-50">
        <div className="flex justify-evenly py-4 bg-white z-50 w-full border-t border-gray-400">
          {links.map((link) => (
            <Link href={link.url}>
              <a className="text-md text-center flex flex-col items-center">
                <span className="text-2xl">{link.icon}</span>
                <p>{link.name}</p>
              </a>
            </Link>
          ))}
        </div>
      </nav>
      <nav className="hidden md:block h-full w-64 h-screen ">
        <div className="flex flex-col h-full flex-1 border-r border-gray-200 bg-white fixed top-0 w-64">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4 font-bold text-3xl">
              Copybooks
            </div>
            <nav
              className="mt-5 flex-1 px-2 bg-white space-y-1"
              aria-label="Sidebar"
            >
              {/* Current: "bg-gray-100 text-gray-900 hover:text-gray-900 hover:bg-gray-100", Default: "text-gray-600 hover:text-gray-900 hover:bg-gray-50" */}
              <Link href="/">
                <a className="bg-gray-100 text-gray-900 hover:text-gray-900 hover:bg-gray-100 group flex items-center px-2 py-4 text-sm font-medium rounded-md">
                  {/*
    Heroicon name: outline/home

    Current: "text-gray-500", Default: "text-gray-400 group-hover:text-gray-500"
  */}
                  <svg
                    className="text-gray-500 mr-3 h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  Home
                </a>
              </Link>
              {links.map((link) => (
                <Link href={link.url}>
                  <a className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 group flex items-center px-2 py-4 text-sm font-medium rounded-md">
                    {/* Heroicon name: outline/users */}
                    {link.icon}
                    {link.name}
                    {/* Current: "bg-white", Default: "bg-gray-100 group-hover:bg-gray-200" */}
                  </a>
                </Link>
              ))}

              <button
                onClick={() => setAddSet(true)}
                className="w-full py-2 rounded-full bg-purple-700 text-white font-bold text-md"
              >
                Add Set
              </button>
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <Link href={`/profile/${user?.id}`}>
              <a href="#" className="flex-shrink-0 w-full group block">
                <div className="flex items-center">
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                      {user?.email}
                    </p>
                    <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                      View profile
                    </p>
                  </div>
                </div>
              </a>
            </Link>
          </div>
        </div>
        {addSet && (
          <Drawer
            title="Add a new set of books"
            handleClose={() => setAddSet(false)}
          >
            <AddSet
              onFinish={(data) => {
                const { id } = data[0];
                setAddSet(false);
                Router.push(`/set/${id}`);
              }}
            />
          </Drawer>
        )}
      </nav>
    </>
  );
};

export default SideNav;
