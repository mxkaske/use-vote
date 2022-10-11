import Link from "next/link";
import Layout from "../components/common/Layout";
import Thumbs from "../components/widgets/Thumbs";

const HomePage = () => {
  return (
    <Layout>
      <h1 className="italic">Welcome to `/`</h1>
      <Link href="/subpage">
        <a>Go to Subpage</a>
      </Link>
      <Thumbs />
    </Layout>
  );
};

export default HomePage;
