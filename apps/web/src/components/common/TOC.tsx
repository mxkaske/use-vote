import Link from "next/link";
import React from "react";
import cn from "classnames";

const styles = {
  link: "font-medium text-lg text-gray-700 hover:text-black",
  variant: {
    base: "marker:text-gray-500 hover:marker:text-black",
    h1: "",
    h2: "",
    h3: "pl-2",
    h4: "pl-4",
    h5: "pl-6",
    h6: "pl-8",
  },
};

const h = [1, 2, 3, 4, 5, 6] as const;

const TOC = ({ source }: { source?: string }) => {
  // TODO: intersection observer
  // React.useEffect(() => {
  //   const observer = new IntersectionObserver((entries) => {
  //     entries.forEach((entry) => {
  //       const id = entry.target.getAttribute("id");
  //       if (entry.intersectionRatio > 0) {
  //         console.log("enter");
  //         document
  //           .querySelector(`nav li a[href="#${id}"]`)
  //           ?.parentElement?.classList.add("active");
  //       } else {
  //         console.log("exit");
  //         document
  //           .querySelector(`nav li a[href="#${id}"]`)
  //           ?.parentElement?.classList.remove("active");
  //       }
  //     });
  //   });
  //   // Track all sections that have an `id` applied
  //   document.querySelectorAll("h1,h2,h3,h4,h5,h6").forEach((heading) => {
  //     console.log(heading);
  //     observer.observe(heading);
  //   });
  // }, []);

  const getHeadings = (source: string) => {
    const regex = /<h(1|2|3|4|5)(.*?)><(.*?)a(.*?)><\/a><\/h(1|2|3|4|5)>/g;
    if (source.match(regex)) {
      return source.match(regex)?.map((heading) => {
        const headingText = heading
          .replace(/<h(1|2|3|4|5)(.*?)>/, "")
          .replace(/<a(.*?)><\/a><\/h(1|2|3|4|5)>/, "");
        // FIXME: use `id=` instead!
        const link = "#" + headingText.replace(/ /g, "-").toLowerCase();
        // FIXME: potentially better code quality
        let tag: keyof typeof styles.variant = "h1";
        for (let i of h) {
          if (heading.match(`<h${i}`)) {
            tag = `h${i}`;
            break;
          }
        }
        return {
          text: headingText,
          link,
          tag,
        };
      });
    }
    return [];
  };

  return (
    <div>
      <p className="text-xl font-bold mb-2">Table of Content</p>
      <nav className="space-y-1">
        {source &&
          getHeadings(source)?.map((heading) => {
            return (
              <li
                key={heading.link}
                className={cn(styles.variant[heading.tag], styles.variant.base)}
              >
                <Link href={heading.link}>
                  <a href={heading.link} className={styles.link}>
                    {heading.text}
                  </a>
                </Link>
              </li>
            );
          })}
      </nav>
    </div>
  );
};

export default TOC;
