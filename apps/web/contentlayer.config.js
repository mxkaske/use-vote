import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypeHighlight from "rehype-highlight";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import readingTime from "reading-time";

export const Content = defineDocumentType(() => ({
  name: "Content",
  filePathPattern: `**/*.md`,
  fields: {
    title: {
      type: "string",
      description: "The title of the content",
      required: true,
    },
    date: {
      type: "date",
      description: "The date of the content",
      required: true,
    },
  },
  computedFields: {
    readingTime: {
      type: "string",
      resolve: (_) => readingTime(_.body.html).text,
    },
    // TODO: rename files and append 001,002,... for the order
    path: {
      type: "json",
      resolve: (_) => {
        const [dir, fileName] = _._raw.flattenedPath.split("/");
        const [, , orderStr, slug] = fileName.match(/^((\d+)-)?(.*)$/) ?? [];
        const order = orderStr ? parseInt(orderStr) : 0;
        return { order, slug, url: `/${dir}/${slug}` };
      },
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Content],
  markdown: {
    rehypePlugins: [
      rehypeHighlight,
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "append",
          properties: {
            className: [
              "group-hover:visible invisible no-underline after:content-['#'] after:ml-1 after:text-gray-400 hover:after:text-gray-800 hover:after:bg-gray-200 after:p-1 after:rounded-md",
            ],
          },
        },
      ],
    ],
  },
});
