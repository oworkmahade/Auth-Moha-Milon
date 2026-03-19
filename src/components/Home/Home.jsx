import { Helmet } from "react-helmet-async";

const Home = () => {
  // data access using useContext

  return (
    <div className="w-1/3 p-4 mx-auto my-4 border-2 border-slate-400">
      <Helmet>
        <title>Home</title>
      </Helmet>
      <h2>Home</h2>
    </div>
  );
};

export default Home;
