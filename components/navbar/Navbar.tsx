import { SheetSide } from "../sheet/SheetSide";
import AvatarNav from "./Avatar";

import NavItems from "./NavItems";
import NavLogo from "./NavLogo";

const Navbar = () => {
  return (
    <header className="bg-zinc-100 h-16 container mx-auto max-w-screen-2xl flex items-center justify-between py-6 px-4  ">
      <div className="flex space-y-2">
        <NavLogo />
        <NavItems />
      </div>
      <div>
        <SheetSide />
        <AvatarNav />
      </div>
    </header>
  );
};

export default Navbar;
