import TypeWriterText from "../components/cards/TypeWriterText";
import CategoryList from "../components/category/CategoryList";
import BestSellers from "../components/home/BestSellers";
import NewArrivals from "../components/home/NewArrivals";
import SubList from "../components/sub/SubList";

const Home = () => {
  return (
    <>
      <div className="bg-info bg-opacity-50 p-5 display-5 fw-bold text-danger h1 text-center">
        <TypeWriterText
          text={["Latest Products", "New Arrivals", "Best Sellers"]}
        />
      </div>

      <h3 className="text-center p-2 mt-5 mb-5 display-6 bg-dark bg-opacity-25">
        New Arrivals
      </h3>
      <NewArrivals />

      <h2 className="text-center p-2 mt-5 mb-5 display-6 bg-dark bg-opacity-25">
        Best Sellers
      </h2>
      <BestSellers />

      <h3 className="text-center p-2 mt-5 mb-5 display-6 bg-dark bg-opacity-25">
        Categories
      </h3>
      <CategoryList />

      <h3 className="text-center p-2 mt-5 mb-5 display-6 bg-dark bg-opacity-25">
        Sub-Categories
      </h3>
      <SubList />
    </>
  );
};

export default Home;
