import ourTeam1 from "@/assets/Nosotros1.png";
import ourTeam2 from "@/assets/Nosotros2.png";
import ourTeam3 from "@/assets/Nosotros3.png";

const OurTeam = () => {
  return (
    <div className="bg-indigo-100 py-16 px-32 relative text-cyan-950">
      <h3 className="text-3xl">Sobre Nosotros</h3>
      <div className="flex flex-col space-y-5 md:space-y-0 md:flex-row pt-10 justify-between">
        <img src={ourTeam1} className="h-60 w-60 rounded-2xl" alt="" />
        <img src={ourTeam2} className="h-60 w-60 rounded-2xl" />
        <img src={ourTeam3} className="h-60 w-60 rounded-2xl" />
      </div>
      <div className="flex justify-center pt-10">
        <button className="bg-cyan-950 text-white px-4 py-1 mt-3 rounded-lg">
          Más Información
        </button>
      </div>
    </div>
  );
};

export default OurTeam;
