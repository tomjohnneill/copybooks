import Link from "next/link";

const SideNav = () => {
  const links = [
    {
      name: "Sets",
      url: "/your-sets",
      icon: "",
    },
    {
      name: "Followers",
      url: "/your-followers",
      icon: "",
    },
    {
      name: "Profile",
      url: "/profile",
      icon: "",
    },
  ];

  return (
    <nav className="h-full w-64 h-screen ">
      <div className="flex flex-col h-full flex-1 border-r border-gray-200 bg-white fixed top-0 w-64">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
              alt="Workflow"
            />
          </div>
          <nav
            className="mt-5 flex-1 px-2 bg-white space-y-1"
            aria-label="Sidebar"
          >
            {/* Current: "bg-gray-100 text-gray-900 hover:text-gray-900 hover:bg-gray-100", Default: "text-gray-600 hover:text-gray-900 hover:bg-gray-50" */}
            <a
              href="#"
              className="bg-gray-100 text-gray-900 hover:text-gray-900 hover:bg-gray-100 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
            >
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
              Dashboard
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
            >
              {/* Heroicon name: outline/users */}
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
              Team
              {/* Current: "bg-white", Default: "bg-gray-100 group-hover:bg-gray-200" */}
              <span className="bg-gray-100 group-hover:bg-gray-200 ml-auto inline-block py-0.5 px-3 text-xs font-medium rounded-full">
                3
              </span>
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
            >
              {/* Heroicon name: outline/folder */}
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
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                />
              </svg>
              Projects
              <span className="bg-gray-100 group-hover:bg-gray-200 ml-auto inline-block py-0.5 px-3 text-xs font-medium rounded-full">
                4
              </span>
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
            >
              {/* Heroicon name: outline/calendar */}
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
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Calendar
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
            >
              {/* Heroicon name: outline/inbox */}
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
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              Documents
              <span className="bg-gray-100 group-hover:bg-gray-200 ml-auto inline-block py-0.5 px-3 text-xs font-medium rounded-full">
                12
              </span>
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
            >
              {/* Heroicon name: outline/chart-bar */}
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
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              Reports
            </a>
          </nav>
        </div>
        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
          <a href="#" className="flex-shrink-0 w-full group block">
            <div className="flex items-center">
              <div>
                <img
                  className="inline-block h-9 w-9 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixqx=08Aoqp3UCk&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt
                />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  Tom Cook
                </p>
                <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                  View profile
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default SideNav;
