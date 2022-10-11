import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="text-center py-4">
      <Link href="/">
        <a href="/">Home</a>
      </Link>
      <Link href="/subpage">
        <a href="/subpage">Subpage</a>
      </Link>
      <Link href="/stats">
        <a href="/stats">Stats</a>
      </Link>
    </div>
  );
};

export default Footer;
