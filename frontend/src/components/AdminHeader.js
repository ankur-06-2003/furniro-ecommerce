import Image from "next/image";
import Link from "next/link";
import logo from "../../public/Logo.png";

import { Button } from "./ui/button";
import { Search, User } from "lucide-react";

const AdminHeader = () => {
  return (
    <header className="bg-background/20 backdrop-blur-xl border border-b border-accent fixed top-0 inset-x-0 z-10">
      <div className="flex items-center justify-between px-2 md:px-4 lg:px-8 py-3">
        <Link href={"/"} className="flex items-center gap-0.5">
          <Image
            src={logo}
            width={28}
            height={28}
            alt="Logo"
            loading="lazy"
            className="w-auto"
          />
          <h1 className="text-xl font-bold">Furniro</h1>
        </Link>

        <form className="bg-input/40 flex items-center rounded-md">
          <input
            type="text"
            placeholder="Search"
            className="w-[180px] md:w-[256px] outline-0 pl-2"
          />
          <Button
            variant="ghost"
            size="icon"
            aria-label="Search"
            className="cursor-pointer"
          >
            <Search />
          </Button>
        </form>

        <Button
          variant="outline"
          size="icon"
          aria-label="User account"
          className="rounded-full cursor-pointer"
        >
          <User />
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
