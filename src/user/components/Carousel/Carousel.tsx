import CarouselImage1 from "@/assets/CarouselImage1.webp";
import CarouselImage2 from "@/assets/CarouselImage2.webp";
import { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

interface CarouselProps {
  autoSlide?: boolean;
  autoSlideInterval?: number;
}

const Carousel: React.FC<CarouselProps> = ({
  autoSlide,
  autoSlideInterval = 3000,
}) => {
  const slides = [CarouselImage1, CarouselImage2];
  const [current, setCurrent] = useState(0);
  const prev = () =>
    setCurrent((current) => (current === 0 ? slides.length - 1 : current - 1));
  const next = () =>
    setCurrent((current) => (current === slides.length - 1 ? 0 : current + 1));

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  });

  return (
    <div className=" relative max-w-full md:h-[30rem] overflow-hidden mx-auto px-10">
      <div className="overflow-hidden rounded-xl">
        <div
          className="flex transition-transform ease-out duration-500"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((s) => (
            <img src={s} key={s} height="500px" width="1500px" alt="" />
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-between px-12">
          <button
            onClick={prev}
            className="p-1 rounded-full shadow shadow-bg-white/20 text-cyan-50 hover:bg-cyan-50 hover:text-cyan-950 transition-all"
          >
            <FaAngleLeft size={25} />
          </button>
          <button
            onClick={next}
            className="p-1 rounded-full shadow shadow-bg-white/20 text-cyan-50 hover:bg-cyan-50 hover:text-cyan-950 transition-all"
          >
            <FaAngleRight size={25} />
          </button>
        </div>
        <div className="absolute top-4 right-0 left-0">
          <div className="flex items-center justify-center gap-2">
            {slides.map((s) => (
              <div
                key={s}
                className={`transition-all w-5 h-2 bg-cyan-50 rounded-full ${
                  current == slides.indexOf(s) ? "" : "bg-opacity-50"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
