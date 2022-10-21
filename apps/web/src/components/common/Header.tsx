import Link from "../ui/Link";
import React from "react";
import HamburgerIcon from "src/icons/HamburgerIcon";
import Menu from "./Menu";
import { useRouter } from "next/router";

const links = [
  { href: "/", label: "Home" },
  { href: "/docs/getting-started", label: "Documentation" },
  { href: "/examples/thumbs", label: "Examples" },
];

const Header = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => setIsOpen((prev) => !prev);
  return (
    <>
      {/* className sticky fixed */}
      <div className="flex gap-4 sm:gap-8 items-center justify-between top-0 bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg w-full z-10">
        <div className="flex gap-4 sm:gap-8 py-4">
          {links.map(({ href, label }) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </div>
        {router.asPath !== "/" && (
          <div className="block md:hidden">
            <button onClick={toggle} className="">
              <HamburgerIcon />
            </button>
          </div>
        )}
      </div>
      {router.asPath !== "/" && <Menu open={isOpen} close={toggle} />}
    </>
  );
};

export default Header;
