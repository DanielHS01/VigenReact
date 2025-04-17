import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import faqImagen from "@/assets/ImagenFAQ.jpg";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "¿Qué se entiende por violencia?",
    answer:
      "La violencia es el uso intencional de la fuerza física o del poder, de manera real o en forma de amenaza, contra uno mismo, otra persona o un grupo. Puede causar lesiones, daños psicológicos, problemas de desarrollo o privaciones, y se manifiesta en ámbitos como el familiar, escolar, laboral o comunitario.",
  },
  {
    question: "¿Cuáles son los tipos de violencia más comunes?",
    answer:
      "Existen varios tipos de violencia. La violencia física incluye golpes, empujones y uso de armas. La violencia psicológica comprende insultos, humillaciones y amenazas. La violencia sexual abarca tocamientos forzados, abuso y acoso. La violencia económica se manifiesta en el control del dinero o la privación de recursos. La violencia simbólica se basa en estereotipos y discriminación que legitiman el maltrato.",
  },
  {
    question: "¿Qué factores pueden desencadenar actos de violencia?",
    answer:
      "A nivel individual, influyen la baja tolerancia a la frustración, problemas de autocontrol o un historial de abuso. En lo relacional, juegan un papel las dinámicas de poder desiguales, los celos y la falta de comunicación. En el plano social y cultural, las normas que normalizan la fuerza, las desigualdades de género o clase y la impunidad pueden favorecerla. Además, el estrés derivado de la pobreza o el desempleo suele aumentar las tensiones.",
  },
  {
    question: "¿Cómo prevenir y actuar ante situaciones de violencia?",
    answer:
      "Para prevenir la violencia, es esencial fomentar la educación en valores como el respeto, la empatía y la comunicación asertiva, así como participar en programas de sensibilización impulsados por la Consejería Presidencial para la Equidad de la Mujer y otras entidades estatales; pero si enfrentas o eres testigo de un acto violento, marca el 123 para emergencias, la Línea 155 para orientación en casos de violencia de género, la 141 para denunciar maltrato infantil , acude a las Comisarías de Familia para atención y denuncias de violencia intrafamiliar, y para asesoría legal o presentar denuncias formales ante la Fiscalía General de la Nación llama a la línea gratuita nacional 018000 919748."
  },
];

export default function FaqComponent(): JSX.Element {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleDropdown = (index: number): void => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-cyan-50 dark:bg-cyan-950 dark:text-cyan-50 text-cyan-950 px-8 py-8 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="w-full h-64 sm:h-80 md:h-4/6">
        <img
          src={faqImagen}
          alt="Imagen de FAQ"
          className="w-full h-full object-cover rounded-xl"
        />
      </div>

      <div>
        <h1 className="text-3xl sm:text-4xl font-semibold uppercase mb-2">
          Preguntas frecuentes
        </h1>
        <p className="text-sm italic mb-6 dark:text-cyan-50 text-cyan-950">
          Esta sección está diseñada para responder preguntas muy generales; sin embargo, si buscas respuestas más específicas o personalizadas, no dudes en consultar a nuestro asistente virtual Valentine.
        </p>

        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-700 dark:border-white py-4">
            <button
              className="flex justify-between items-center w-full text-left text-base sm:text-lg font-medium focus:outline-none"
              onClick={() => toggleDropdown(index)}
            >
              <span className="mr-2">{faq.question}</span>
              {openIndex === index ? (
                <FaChevronUp size={16} />
              ) : (
                <FaChevronDown size={16} />
              )}
            </button>
            {openIndex === index && (
              <p className="mt-2 dark:text-cyan-50 text-cyan-950 text-sm leading-relaxed">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}