import React from "react";
import Link from "next/link";
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
      {" "}
      <div className="flex gap-4 sm:gap-8 items-center justify-between">
        <div className="flex gap-4 sm:gap-8 py-4">
          {links.map(({ href, label }) => (
            <Link key={href} href={href}>
              <a href={href}>{label}</a>
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
