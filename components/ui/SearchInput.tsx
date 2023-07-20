import { Input } from "./input";
import { Button } from "./button";

const SearchInput = () => {
  return (
    <div className="hidden lg:flex w-1/3  items-center space-x-2">
      <Input type="email" placeholder="Search a vehicle" />
      <Button type="submit">Search</Button>
    </div>
  );
};

export default SearchInput;
