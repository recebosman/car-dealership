import { Nav_Links } from "@/constants";
import Link from "next/link";

const NavItems = () => {
  return (
    <nav className="hidden md:flex ml-4">
      <ul className=" flex font-semibold space-x-2 text-lg tracking-normal">
        {Nav_Links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.path}
              className="text-gray-900 hover:text-gray-500"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavItems;
