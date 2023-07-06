import React from "react";

const NavLogo = () => {
  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-2xl md:text-3xl tracking-tighter">
        <span className="text-gray-800">Rekon</span>{" "}
        <span className="text-gray-900">Rent a Car</span>
      </h1>
      <p>
        <span className="text-gray-500 text-sm">Explore the world of</span>{" "}
        <span className="text-gray-900 font-bold text-md">Car Rentals</span>
      </p>
    </div>
  );
};

export default NavLogo;
