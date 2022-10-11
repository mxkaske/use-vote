import { Content } from "contentlayer/generated";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import cn from "classnames";

const DirContent = ({ contents }: { contents?: Content[] }) => {
  const router = useRouter();
  return (
    <nav className="list-none border-l border-gray-200 space-y-2">
      {contents?.map((c) => {
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
  );
};

export default DirContent;
