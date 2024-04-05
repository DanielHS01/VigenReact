import udecImage from "@/assets/udec.jpg";

const AboutUsComponent = () => {
  return (
    <div className="bg-cyan-50 md:mb-0 text-cyan-950 w-full">
      <div className="p-15 relative flex flex-col w-full overflow-hidden">
        <img
          src={udecImage}
          className="opacity-30 md:translate-x-24 xl:translate-x-[39rem] md:h-[45rem] lg:h-[36rem] h-[38rem] lg:w-[50rem] inset-0 object-cover"
        />
        <div className="absolute md:left-28 md:w-[38rem] flex flex-col w-full justify-center p-10 md:text-start mt-16 lg:mt-16">
          <h2 className="md:text-5xl mb-5 text-4xl font-semibold">
            Sobre Nosotros
          </h2>
          <p>
            Somos un equipo de estudiantes de la Universidad de Cundinamarca que
            utiliza la metodología Scrum para desarrollar un proyecto que busca
            mitigar casos de violencia de género, intrafamiliar, infantil y
            contra adultos mayores mediante un modelo de Machine Learning.
            Creemos en el poder de la tecnología para generar cambios positivos
            en la comunidad. Estamos comprometidos en hacer realidad este
            proyecto que marcará la diferencia para quienes sufren violencia en
            silencio. Agradecemos el apoyo de la universidad y de todas las
            personas e instituciones que respaldan esta misión.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsComponent;
