import { Helmet } from "react-helmet-async";

const Home = () => {
  // data access using useContext

  return (
    <div className="my-4">
      <Helmet>
        <title>Home</title>
      </Helmet>
      <h2>Home</h2>
      <h2>Context Value: </h2>
    </div>
  );
};

export default Home;
