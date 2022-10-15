import Link from "next/link";
import Layout from "../components/common/Layout";
import Thumbs from "../components/widgets/Thumbs";

const HomePage = () => {
  return (
    <Layout>
      <div className="prose">
        <h1 className="italic">Welcome to `/`</h1>
        <Thumbs />
      </div>
    </Layout>
  );
};

export default HomePage;
