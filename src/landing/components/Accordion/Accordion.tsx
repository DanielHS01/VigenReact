const Accordion = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center space-y-10 md:space-y-0 md:justify-around relative bottom-32">
      <div className="flex flex-col space-y-5 bg-white p-5 w-64 rounded-2xl shadow-2xl">
        <p className="cursor-pointer underline">¿Qué es?</p>
        <p className="cursor-pointer">Tipos de Violencia</p>
        <p className="cursor-pointer">¿Dónde Denunciar?</p>
        <p className="cursor-pointer">Preguntas Frecuentes</p>
      </div>
      <div className="bg-white flex w-80 md:w-[45rem] p-5 rounded-2xl shadow-2xl">
        <div className="flex flex-col">
          <h2 className="text-2xl font-medium mb-1 flex text-start">
            ¿Qué es?
          </h2>
          <p>
            Violencia es todo acto, acción u omisión que produzca daño o
            sufrimiento físico, sexual, psicológico, verbal, o económico a una
            persona; puede ocurrir en público o en privado. Las situaciones
            violentas ocurren cada vez que una persona impone su poder sobre
            otra vulnerando sus derechos.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
