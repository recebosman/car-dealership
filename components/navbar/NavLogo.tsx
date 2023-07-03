import React from "react";

const NavLogo = () => {
  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-3xl tracking-tighter">
        <span className="text-gray-800">Rekon</span>{" "}
        <span className="text-gray-900">Rent a Car</span>
      </h1>
      <p>
        <span className="text-gray-500 text-sm">Welcome to</span>{" "}
        <span className="text-gray-900 font-bold text-md">Car Dealership</span>
      </p>
    </div>
  );
};

export default NavLogo;
