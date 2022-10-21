import Link from "src/components/ui/Link";
import Stars from "src/components/widgets/Stars";
import Layout from "../components/common/Layout";

// TODO: Marketing -> describe good use cases: documentation, knowledge base,...

const HomePage = () => {
  return (
    <Layout>
      <div className="max-w-[65ch]">
        <h1 className="text-4xl font-extrabold tracking-wider mb-2">
          use-fdbk
        </h1>
        <p className="text-lg font-medium mb-2">
          Enhance your{" "}
          <Link href="https://nextjs.org" className="font-bold">
            Next.js
          </Link>{" "}
          project with a self-hosted headless rating system. Powered by{" "}
          <Link href="https://upstash.com" className="font-bold">
            Upstash
          </Link>
          .
        </p>
        <p className="text-lg font-medium mb-2">
          Use cases: Documentation, Knowledge Base,...
        </p>
        <Stars />
        {/* <div className="max-w-sm bg-gray-50 border border-gray-100 rounded-md px-3 py-2 mt-6">
        </div> */}
      </div>
    </Layout>
  );
};

export default HomePage;
