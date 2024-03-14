import "@/landing/components/Hero/Hero.css";

const Hero = () => {
  return (
    <div className="image-background bg-center bg-cover mx-11 my-6 h-[35rem] flex flex-col justify-center items-center rounded-[2rem] text-white space-y-2">
      <h1 className="text-center text-6xl font-medium">
        No a la violencia de género
      </h1>
      <p className="text-center text-lg">
        “No quiero sentirme valiente cuando salga a la calle, quiero sentirme
        libre”
      </p>
    </div>
  );
};

export default Hero;
