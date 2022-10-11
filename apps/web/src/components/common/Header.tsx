import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/docs/getting-started", label: "Documentation" },
  { href: "/examples/thumbs", label: "Examples" },
];

const Header = () => {
  return (
    <div className="flex gap-4 sm:gap-8 py-4">
      {links.map(({ href, label }) => (
        <Link key={href} href={href}>
          <a href={href}>{label}</a>
        </Link>
      ))}
    </div>
  );
};

export default Header;
