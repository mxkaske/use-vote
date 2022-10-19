import React from "react";
import Link from "../ui/Link";

const links = [
  { href: "/analytics", label: "Analytics" },
  { href: "/changelog/v0.0.0", label: "Changelog" },
];

const community = [
  { href: "https://twitter.com/mxkaske", label: "Twitter" },
  { href: "https://github.com/mxkaske/use-vote", label: "GitHub" },
];

const Footer = () => {
  return (
    <div className="flex flex-row gap-2 py-4 divide-x">
      <ul className="flex gap-2 ">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link href={href}>{label}</Link>
          </li>
        ))}
      </ul>
      <ul className="flex gap-2 pl-2">
        {community.map(({ href, label }) => (
          <li key={href}>
            <Link href={href}>{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Footer;
