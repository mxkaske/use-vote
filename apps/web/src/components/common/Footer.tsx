import Link from "next/link";
import React from "react";

const links = [
  { href: "/subpage", label: "Subpage" },
  { href: "/stats", label: "Statistics" },
  { href: "/changelog/v0.0.0", label: "Changelog" },
];

const Footer = () => {
  return (
    <div className="text-center py-4">
      {links.map(({ href, label }) => (
        <Link href={href}>
          <a href={href}>{label}</a>
        </Link>
      ))}
    </div>
  );
};

export default Footer;
