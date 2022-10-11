import React from "react";
import { Popover } from "@headlessui/react";
import { allContents } from "contentlayer/generated";
import Link from "next/link";

const NavigationPopover = ({ fileDir = "docs" }: { fileDir?: string }) => {
  const contents = allContents.filter((c) => c._raw.sourceFileDir === fileDir);
  return (
    <Popover className="relative">
      <Popover.Button className="capitalize">{fileDir}</Popover.Button>
      <Popover.Panel className="absolute z-10 min-w-max rounded-md border bg-white space-y-1">
        {contents.map((c) => {
          return (
            <Popover.Button
              as={MyLink}
              key={c._id}
              href={c.path.url}
              className="block hover:bg-gray-50 text-gray-800 hover:text-black px-2"
            >
              {c.title}
            </Popover.Button>
          );
        })}
      </Popover.Panel>
    </Popover>
  );
};

// https://headlessui.com/react/menu#integrating-with-next-js with Popover.Button
// eslint-disable-next-line react/display-name
const MyLink = React.forwardRef<HTMLAnchorElement, JSX.IntrinsicElements["a"]>(
  (props, ref) => {
    let { href, children, ...rest } = props;
    return (
      <Link href={href as string}>
        <a ref={ref} {...rest}>
          {children}
        </a>
      </Link>
    );
  }
);

export default NavigationPopover;
