import { allContents, Content } from "contentlayer/generated";
import React from "react";
import Thumbs from "../widgets/Thumbs";
import Link from "next/link";
import { useRouter } from "next/router";
import cn from "classnames";

// DISCUSS: How to make that arbitrary and use the Sidebar also on home page.

const SideBar = ({ contents }: { contents?: Content[] }) => {
  const router = useRouter();
  const slug = router.query.slug as string[];
  // DISCUSS: How to access the contents in Menu on client side without passing `contents`
  const contentCSR =
    slug.length > 0
      ? allContents.filter((c) => c._raw.sourceFileDir === slug[0])
      : undefined;

  return (
    <>
      <nav className="list-none border-l border-gray-200 space-y-2">
        {(contents || contentCSR)?.map((c) => {
          const active = router.asPath === c.path.url;
          return (
            <li key={c._id}>
              <Link href={c.path.url}>
                <a
                  className={cn(
                    "block pl-3 border-l -ml-px",
                    active
                      ? "text-black border-black"
                      : "text-gray-600 hover:text-gray-800 border-gray-200 hover:border-gray-400"
                  )}
                >
                  {c.title}
                </a>
              </Link>
            </li>
          );
        })}
      </nav>
      <Thumbs />
    </>
  );
};

export default SideBar;
