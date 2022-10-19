import React from "react";
import { default as NextLink } from "next/link";

const Link = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  if (href.startsWith("/")) {
    return (
      <NextLink href={href}>
        <a
          href={href}
          className="underline underline-offset-2 decoration-gray-300 hover:decoration-inherit"
        >
          {children}
        </a>
      </NextLink>
    );
  } else {
    return (
      <a
        href={href}
        className="underline underline-offset-2 decoration-gray-200 hover:decoration-gray-400"
        target="_blank"
        rel="noreferrer"
      >
        {children}
      </a>
    );
  }
};
export default Link;
