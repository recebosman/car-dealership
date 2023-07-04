import { SheetSide } from "../sheet/SheetSide";
import { Button } from "../ui/button";
import AvatarNav from "./Avatar";

import NavItems from "./NavItems";
import NavLogo from "./NavLogo";
import { NavNotification } from "./NavNotification";

const Navbar = () => {
  return (
    <header className="h-16 container mx-auto max-w-screen-2xl flex items-center justify-between py-6 px-4  ">
      <div className="flex space-y-2">
        <NavLogo />
        <NavItems />
      </div>
      <div>
        <div className="flex items-center gap-x-2">
          <NavNotification />
          <SheetSide />
          <AvatarNav />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
