"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { X } from "lucide-react";

import useAuth from "@/stores/userStore";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const Navigation = ({ isMobileOpen, setIsMobileOpen }) => {
  const { user, logOut } = useAuth();

  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <div
        onClick={() => setIsMobileOpen(false)}
        className={`w-full h-screen bg-black/40 transition-opacity duration-300 ${
          isMobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        } fixed inset-0 z-49`}
      />
      <div
        className={`bg-background w-[300px] h-screen p-4 fixed top-0 right-0 z-50 transform transition-transform duration-300 ${
          isMobileOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col justify-between`}
      >
        <div className="space-y-8">
          <div className="w-full flex items-center justify-between">
            <h3 className="font-semibold ml-4">{user?.name || ""}</h3>

            <Button
              variant="ghost"
              aria-label="Close menu"
              onClick={() => setIsMobileOpen(false)}
              className="cursor-pointer"
            >
              <X strokeWidth="2.5px" />
            </Button>
          </div>

          <div className="space-y-2 divide-y-2 divide-primary/60">
            <div className="pb-2 divide-y divide-primary/40">
              {user ? (
                <>
                  <Button
                    variant="ghost"
                    className="w-full justify-start cursor-pointer"
                    onClick={() => {
                      logOut();
                      setIsMobileOpen(false);
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Button
                  variant="ghost"
                  aria-label="Login"
                  className="w-full justify-start"
                >
                  <Link
                    href={`/login?redirect=${encodeURIComponent(pathname)}`}
                  >
                    Login
                  </Link>
                </Button>
              )}
            </div>
            <nav className="divide-y divide-primary/40">
              {navItems.map((nav) => (
                <Button
                  key={nav.label}
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <Link href={nav.href} onClick={() => setIsMobileOpen(false)}>
                    {nav.label}
                  </Link>
                </Button>
              ))}
            </nav>
          </div>
        </div>

        <div className="w-full flex items-center justify-between">
          <Link href="/refund-policy" className="underline hover:text-primary">
            Refund policy
          </Link>
          <Link href="/privacy-policy" className="underline hover:text-primary">
            Privacy policy
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navigation;
