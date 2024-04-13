import Carousel from "@/user/components/Carousel/Carousel";
import News from "@/user/components/News/News";
import Helps from "../components/Helps/Helps";
import Emergency from "@/user/components/Emergency/Emergency";

const Home = () => {
  return (
    <div>
      <Carousel autoSlide={true} />
      <News />
      <Helps />
      <Emergency />
    </div>
  );
};

export default Home;
