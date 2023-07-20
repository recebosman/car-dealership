"use client";
import { Input } from "./input";
import { Button } from "./button";
import useSearchStore from "@/store/useSearchStore";
import { useState } from "react";

const SearchInput = () => {
  const { setSearch } = useSearchStore();
  const [searchValue, setSearchValue] = useState("");
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);

    if (e.target.value.length > 2) {
      setSearch(searchValue);
    } else {
      setSearch("");
    }
  };

  return (
    <div className="hidden lg:flex w-1/3  items-center space-x-2">
      <Input
        value={searchValue}
        onChange={handleSearch}
        type="text"
        placeholder="Search a vehicle"
      />
      <Button type="submit">Search</Button>
    </div>
  );
};

export default SearchInput;
