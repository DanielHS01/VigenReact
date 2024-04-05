import { useState } from "react";

const Accordion = () => {
  const [title, setTitle] = useState("¿Qué es?");
  const [description, setDescription] = useState(
    "Violencia es todo acto, acción u omisión que produzca daño o sufrimiento físico, sexual, psicológico, verbal, o económico a una persona; puede ocurrir en público o en privado. Las situaciones violentas ocurren cada vez que una persona impone su poder sobre otra vulnerando sus derechos."
  );
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index: number) => {
    setActiveIndex(index);
    switch (index) {
      case 0:
        setTitle("¿Qué es?");
        setDescription(
          "Violencia es todo acto, acción u omisión que produzca daño o sufrimiento físico, sexual, psicológico, verbal, o económico a una persona; puede ocurrir en público o en privado. Las situaciones violentas ocurren cada vez que una persona impone su poder sobre otra vulnerando sus derechos."
        );
        break;
      case 1:
        setTitle("Tipos de Violencia");
        setDescription(
          "Los principales tipos de violencia incluyen la violencia física, que causa daño corporal; la violencia sexual, que implica actos sexuales no consentidos; la violencia psicológica, que daña la salud emocional a través de humillaciones y amenazas; la violencia verbal, el uso de palabras para menospreciar."
        );
        break;
      case 2:
        setTitle("¿Dónde Denunciar?");
        setDescription(
          "Las víctimas de violencia pueden acudir a varias entidades para denunciar y recibir atención, como la Línea Púrpura de la Secretaría de la Mujer, las Comisarías de Familia, la Fiscalía General de la Nación, y diversas organizaciones de la sociedad civil, las cuales brindan orientación, asesoría jurídica y acompañamiento a quienes hayan sufrido algún tipo de violencia."
        );
        break;
      case 3:
        setTitle("Preguntas Frecuentes");
        setDescription(
          "Las preguntas más comunes que suelen hacerse las víctimas de violencia incluyen: ¿Qué es la violencia y cuáles son sus diferentes tipos? ¿Cómo puedo identificar si estoy siendo víctima de violencia? ¿Qué puedo hacer si estoy sufriendo algún tipo de violencia? ¿Cuáles son mis derechos como víctima de violencia? ¿Cómo puedo protegerme y mantenerme a salvo?"
        );
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center space-y-10 md:space-y-0 md:justify-around space-x-5 relative bottom-32 text-cyan-950 p-10">
      <div className="flex flex-col space-y-5 bg-white p-5 w-64 rounded-2xl shadow-2xl">
        <p
          className={`cursor-pointer ${activeIndex === 0 ? "underline" : ""}`}
          onClick={() => handleClick(0)}
        >
          ¿Qué es?
        </p>
        <p
          className={`cursor-pointer ${activeIndex === 1 ? "underline" : ""}`}
          onClick={() => handleClick(1)}
        >
          Tipos de Violencia
        </p>
        <p
          className={`cursor-pointer ${activeIndex === 2 ? "underline" : ""}`}
          onClick={() => handleClick(2)}
        >
          ¿Dónde Denunciar?
        </p>
        <p
          className={`cursor-pointer ${activeIndex === 3 ? "underline" : ""}`}
          onClick={() => handleClick(3)}
        >
          Preguntas Frecuentes
        </p>
      </div>
      <div className="bg-white flex w-64 md:w-[45rem] p-5 rounded-2xl shadow-2xl">
        <div className="flex flex-col">
          <h2 className="text-2xl font-medium mb-1 flex text-start">{title}</h2>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
