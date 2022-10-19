import Link from "../ui/Link";
import React from "react";
import HamburgerIcon from "src/icons/HamburgerIcon";
import Menu from "./Menu";

const links = [
  { href: "/", label: "Home" },
  { href: "/docs/getting-started", label: "Documentation" },
  { href: "/examples/thumbs", label: "Examples" },
];

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  console.log(isOpen);
  const toggle = () => setIsOpen((prev) => !prev);
  return (
    <>
      <div className="flex gap-4 sm:gap-8 items-center justify-between sticky top-0 bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg w-full">
        <div className="flex gap-4 sm:gap-8 py-4">
          {links.map(({ href, label }) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </div>
        <div className="block md:hidden">
          <button onClick={toggle} className="">
            <HamburgerIcon />
          </button>
        </div>
      </div>
      <Menu open={isOpen} close={toggle} />
    </>
  );
};

export default Header;
