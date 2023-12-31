import React from "react";

const PaginationVehicle = () => {
  return (
    <div className="flex justify-center items-center mt-8 py-2 transition-all duration-300 bg-white rounded-lg shadow-md">
      <a
        href="#"
        className="px-4 py-2 mx-1 text-gray-500 capitalize bg-white rounded-md cursor-not-allowed  "
      >
        <div className="flex items-center -mx-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 mx-1 rtl:-scale-x-100"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 16l-4-4m0 0l4-4m-4 4h18"
            />
          </svg>

          <span className="mx-1">previous</span>
        </div>
      </a>

      <a
        href="#"
        className="hidden px-4 py-2 mx-1  text-gray-700 transition-colors duration-300 transform bg-white rounded-md sm:inline hover:bg-gray-800 hover:text-white "
      >
        1
      </a>

      <a
        href="#"
        className="hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md sm:inline hover:bg-gray-800 hover:text-white "
      >
        2
      </a>

      <a
        href="#"
        className="hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md sm:inline hover:bg-gray-800 hover:text-white "
      >
        3
      </a>

      <a
        href="#"
        className="hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md sm:inline hover:bg-gray-800 hover:text-white "
      >
        4
      </a>

      <a
        href="#"
        className="hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md sm:inline hover:bg-gray-800 hover:text-white "
      >
        5
      </a>

      <a
        href="#"
        className="px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md hover:bg-gray-800  hover:text-white"
      >
        <div className="flex items-center -mx-1">
          <span className="mx-1">Next</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 mx-1 rtl:-scale-x-100"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </div>
      </a>
    </div>
  );
};

export default PaginationVehicle;
