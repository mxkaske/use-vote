import React from "react";
import { allContents, Content } from "contentlayer/generated";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Layout from "src/components/common/Layout";
import { useRef } from "react";
import SideBar from "src/components/common/SideBar";

const ContentPage = ({
  content,
  dirContent,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const ref = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    Array.from(ref.current?.children || []).map((child) => {
      const id = child.getAttribute("id");
      if (id && ["H1", "H2", "H3", "H4", "H5", "H6"].includes(child.tagName)) {
        document.getElementById(id)?.setAttribute("class", "group");
      }
    });
    // REMINDER: empty deps array will not trigger an effect on slug page change.
  }, [content, dirContent]);

  console.log("render");

  return (
    <Layout>
      <div className="flex min-h-max gap-8">
        <div className="overflow-auto">
          {/* FIXME: check prose max width and extract and move h1/p our of prose */}
          {/* FIXME: How to make anchor element visible (hidden by the Header) */}
          <div className="prose prose-img:rounded-md prose-pre:border prose-pre:border-gray-300">
            {/* DISCUSS: could be moved to # Heading 1 in the content body */}
            <h1 className="text-4xl mb-2 font-extrabold">{content?.title}</h1>
            <p className="font-extralight text-sm">{content?.readingTime}</p>
            {content && (
              <div
                ref={ref}
                dangerouslySetInnerHTML={{ __html: content?.body.html }}
              />
            )}
          </div>
        </div>
        {/* TODO: create a Twitter thread about that! */}
        <div
          key={content?._id}
          className="sticky top-0 self-start space-y-6 -mt-16 pt-16 hidden md:block"
        >
          <SideBar contents={dirContent} />
        </div>
      </div>
    </Layout>
  );
};

export default ContentPage;

export async function getStaticPaths() {
  const paths = allContents.map((content) => content.path.url);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  let content: Content | undefined;
  let dirContent: Content[] | undefined;
  if (typeof params?.slug === "string") {
    // content = allContents.find((content) => content.path.url === params?.slug);
    // const firstContent = allContents
    //   .sort((a, b) => (a.path.order < b.path.order ? -1 : 1))
    //   .find((c) => c._raw.sourceFileDir === params?.slug);
    // if (firstContent) {
    //   return {
    //     redirect: {
    //       destination: firstContent.path.url,
    //       permanent: false,
    //     },
    //   };
    // }
  } else if (Array.isArray(params?.slug)) {
    const slug = params?.slug as string[];
    content = allContents.find((c) => c.path.url === `/${slug.join("/")}`);
    if (slug.length > 1) {
      dirContent = allContents.filter(
        (content) => content._raw.sourceFileDir === slug[0]
      );
    }
  }
  return { props: { content, dirContent } };
}
