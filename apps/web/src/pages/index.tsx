import Layout from "../components/common/Layout";
import Thumbs from "../components/widgets/Thumbs";

// TODO: Marketing -> describe good use cases: documentation, knowledge base,...

const HomePage = () => {
  return (
    <Layout>
      <div className="max-w-[65ch]">
        <h1 className="text-4xl font-extrabold mb-2">use-fdbk</h1>
        <p className="text-lg font-medium mb-2">
          Enhance your Next.js Application with a headless rating system.
        </p>
        <p className="text-lg font-medium mb-2">
          Use cases: Documentation, Knowledge Base,...
        </p>
        <div className="max-w-sm bg-gray-50 border border-gray-100 rounded-md px-3 py-2 mt-6">
          <Thumbs />
          {/* Instead of Thumbs, use Stars */}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
