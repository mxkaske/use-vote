import React from "react";
import { default as NextLink } from "next/link";
import cn from "classnames";

const Link = ({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) => {
  const rootClassName = cn(
    "underline underline-offset-2 decoration-gray-300 hover:decoration-gray-400",
    className
  );
  if (href.startsWith("/")) {
    return (
      <NextLink href={href}>
        <a href={href} className={rootClassName}>
          {children}
        </a>
      </NextLink>
    );
  } else {
    return (
      <a href={href} className={rootClassName} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }
};
export default Link;
