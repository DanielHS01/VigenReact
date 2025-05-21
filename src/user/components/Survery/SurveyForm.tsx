import React, { useState } from "react";
import { submitSurvey, SurveyData } from "@/user/services/pollService";
import { useTranslation } from "react-i18next";
import Select, { StylesConfig } from "react-select";

// Definimos nuestro propio tipo de opción personalizado
interface OptionType {
  value: number;
  label: string;
}

const SurveyForm: React.FC = () => {
  const [UserId, setUserId] = useState("");
  const [Edad, setEdad] = useState<number>(18);
  const [Genero, setGenero] = useState<number>(0);
  const [OrientacionSexual, setOrientacionSexual] = useState<number>(0);
  const [Municipio, setMunicipio] = useState<number>(0);
  const [Sector, setSector] = useState<number>(0);
  const [NivelEducativo, setNivelEducativo] = useState<number>(0);
  const [EstadoCivil, setEstadoCivil] = useState<number>(0);
  const [Etnia, setEtnia] = useState<number>(0);
  const [Ingresos, setIngresos] = useState<number>(0);
  const [Ocupacion, setOcupacion] = useState<number>(0);
  const [respuestas, setRespuestas] = useState<{ [key: string]: number }>({
    P1: 0,
    P2: 0,
    P3: 0,
    P4: 0,
    P5: 0,
    P6: 0,
    P7: 0,
  });
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const handleChangeRespuesta = (pregunta: string, valor: number) => {
    setRespuestas((prev) => ({
      ...prev,
      [pregunta]: valor,
    }));
  };

  const validateForm = (): boolean => {
    if (!UserId.trim()) {
      setError(t("Poll.errors.userId") || "User ID is required");
      return false;
    }
    if (Edad < 18) {
      setError(t("Poll.errors.age") || "Age must be 18 or older");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    const surveyData: SurveyData = {
      UserId,
      Date: new Date().toISOString(),
      Genero,
      OrientacionSexual,
      Edad,
      Municipio,
      Sector,
      NivelEducativo,
      EstadoCivil,
      Etnia,
      Ingresos,
      Ocupacion,
      P1: respuestas.P1,
      P2: respuestas.P2,
      P3: respuestas.P3,
      P4: respuestas.P4,
      P5: respuestas.P5,
      P6: respuestas.P6,
      P7: respuestas.P7,
    };

    try {
      await submitSurvey(surveyData);
      setMensaje(t("Poll.success") || "Survey submitted successfully.");
      setError("");
    } catch (error) {
      setError(t("Poll.error") || "Error submitting the survey.");
      setMensaje("");
    } finally {
      setIsLoading(false);
    }
  };

  const preguntas = [
    { id: "P1", texto: t("Poll.questionsDescription") },
    { id: "P2", texto: t("Poll.punching") },
    { id: "P3", texto: t("Poll.threatened") },
    { id: "P4", texto: t("Poll.pressured") },
    { id: "P5", texto: t("Poll.belongings") },
    { id: "P6", texto: t("Poll.shaken") },
    { id: "P7", texto: t("Poll.assaulted") },
  ];

  // Opciones para todos los campos
  const generoOptions: OptionType[] = [
    { value: 1, label: t("Poll.man") || "Hombre" },
    { value: 0, label: t("Poll.woman") || "Mujer" },
    { value: 2, label: t("Poll.binary") || "No binario" },
  ];

  const orientacionOptions: OptionType[] = [
    { value: 0, label: t("Poll.hetero") || "Heterosexual" },
    { value: 1, label: t("Poll.homo") || "Homosexual" },
    { value: 2, label: t("Poll.bi") || "Bisexual" },
    { value: 3, label: t("Poll.asexual") || "Asexual" },
    { value: 4, label: t("Poll.pan") || "Pansexual" },
  ];

  const municipioOptions: OptionType[] = [
    { value: 0, label: "Facatativá" },
    { value: 1, label: "Madrid" },
    { value: 2, label: "Mosquera" },
    { value: 3, label: t("Poll.other") || "Otro" },
  ];

  const sectorOptions: OptionType[] = [
    { value: 0, label: t("Poll.rural") || "Rural" },
    { value: 1, label: t("Poll.urban") || "Urbano" },
  ];

  const nivelEducativoOptions: OptionType[] = [
    { value: 0, label: t("Poll.elementary") || "Primaria" },
    { value: 1, label: t("Poll.secondary") || "Secundaria" },
    { value: 2, label: t("Poll.highschool") || "Bachillerato" },
    { value: 3, label: t("Poll.technical") || "Técnico" },
    { value: 4, label: t("Poll.undergraduate") || "Universitario" },
  ];

  const estadoCivilOptions: OptionType[] = [
    { value: 0, label: t("Poll.single") || "Soltero/a" },
    { value: 1, label: t("Poll.married") || "Casado/a" },
    { value: 2, label: t("Poll.widowed") || "Viudo/a" },
    { value: 3, label: t("Poll.free") || "Unión libre" },
  ];

  const etniaOptions: OptionType[] = [
    { value: 0, label: t("Poll.afro") || "Afrodescendiente" },
    { value: 1, label: t("Poll.indigenous") || "Indígena" },
    { value: 2, label: t("Poll.rom") || "ROM" },
    { value: 3, label: t("Poll.narp") || "NARP" },
    { value: 4, label: t("Poll.none") || "Ninguna" },
  ];

  const ingresosOptions: OptionType[] = [
    { value: 0, label: t("Poll.no") || "No" },
    { value: 1, label: t("Poll.yes") || "Sí" },
  ];

  const ocupacionOptions: OptionType[] = [
    { value: 0, label: t("Poll.private") || "Privado" },
    { value: 1, label: t("Poll.government") || "Gobierno" },
    { value: 2, label: t("Poll.domestic") || "Doméstico" },
    { value: 3, label: t("Poll.self") || "Independiente" },
    { value: 4, label: t("Poll.employer") || "Empleador" },
    { value: 5, label: t("Poll.unpaid") || "No remunerado" },
    { value: 6, label: t("Poll.student") || "Estudiante" },
    { value: 7, label: t("Poll.unemployed") || "Desempleado" },
  ];

  const respuestaOptions: OptionType[] = [
    { value: 0, label: t("Poll.no") || "No" },
    { value: 1, label: t("Poll.yes") || "Sí" },
  ];

  // Estilos personalizados para react-select con tipos específicos
  const customStyles: StylesConfig<OptionType, false> = {
    control: (provided, state) => ({
      ...provided,
      border: "2px solid #d1d5db", // border-gray-300
      borderRadius: "0.5rem", // rounded-lg
      padding: "0.75rem", // p-3
      boxShadow: state.isFocused ? "none" : "none", // Eliminar recuadro azul en foco
      outline: state.isFocused ? "none" : "none", // Asegurar que no haya outline azul
      borderColor: state.isFocused ? "#104e64" : "#d1d5db", // Cambiar borde a púrpura en foco
      "&:hover": {
        borderColor: state.isFocused ? "#104e64" : "#d1d5db",
      },
      "&:focus": {
        outline: "none", // Reforzar eliminación de outline
        boxShadow: "none", // Reforzar eliminación de box-shadow
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#005f78" // bg-blue-400 para la opción seleccionada
        : state.isFocused
        ? "#bfdbfe" // bg-blue-200 para el hover/focus
        : "white",
      color: state.isSelected ? "white" : "black",
      
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "0.5rem", // rounded-lg
      marginTop: "0.25rem", // mt-1
    }),
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-6 text-cyan-950 "
      aria-labelledby="survey-form-title"
    >
      {/* Personal Information Section */}
      <fieldset className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label htmlFor="userId" className="font-medium mb-1">
              {t("Login.id")}:
            </label>
            <input
              id="userId"
              type="text"
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-cyan-900"
              value={UserId}
              onChange={(e) => setUserId(e.target.value)}
              required
              aria-required="true"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="edad" className="font-medium mb-1 ">
              {t("Poll.age")}:
            </label>
            <input
              id="edad"
              type="number"
              min="18"
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-blue-900"
              value={Edad}
              onChange={(e) => setEdad(Number(e.target.value))}
              required
              aria-required="true"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="genero" className="font-medium mb-1">
              {t("Poll.gender")}:
            </label>
            <Select<OptionType>
              id="genero"
              options={generoOptions}
              value={generoOptions.find((option) => option.value === Genero)}
              onChange={(option) => setGenero(option ? option.value : 0)}
              styles={customStyles}
              className="text-black"
              classNamePrefix="select"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="orientacion" className="font-medium mb-1">
              {t("Poll.orientation")}:
            </label>
            <Select<OptionType>
              id="orientacion"
              options={orientacionOptions}
              value={orientacionOptions.find((option) => option.value === OrientacionSexual)}
              onChange={(option) => setOrientacionSexual(option ? option.value : 0)}
              styles={customStyles}
              className="text-black"
              classNamePrefix="select"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="municipio" className="font-medium mb-1">
              {t("Poll.city")}:
            </label>
            <Select<OptionType>
              id="municipio"
              options={municipioOptions}
              value={municipioOptions.find((option) => option.value === Municipio)}
              onChange={(option) => setMunicipio(option ? option.value : 0)}
              styles={customStyles}
              className="text-black"
              classNamePrefix="select"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="sector" className="font-medium mb-1">
              {t("Poll.area")}:
            </label>
            <Select<OptionType>
              id="sector"
              options={sectorOptions}
              value={sectorOptions.find((option) => option.value === Sector)}
              onChange={(option) => setSector(option ? option.value : 0)}
              styles={customStyles}
              className="text-black"
              classNamePrefix="select"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="nivelEducativo" className="font-medium mb-1">
              {t("Poll.education")}:
            </label>
            <Select<OptionType>
              id="nivelEducativo"
              options={nivelEducativoOptions}
              value={nivelEducativoOptions.find((option) => option.value === NivelEducativo)}
              onChange={(option) => setNivelEducativo(option ? option.value : 0)}
              styles={customStyles}
              className="text-black"
              classNamePrefix="select"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="estadoCivil" className="font-medium mb-1">
              {t("Poll.marital")}:
            </label>
            <Select<OptionType>
              id="estadoCivil"
              options={estadoCivilOptions}
              value={estadoCivilOptions.find((option) => option.value === EstadoCivil)}
              onChange={(option) => setEstadoCivil(option ? option.value : 0)}
              styles={customStyles}
              className="text-black"
              classNamePrefix="select"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="etnia" className="font-medium mb-1">
              {t("Poll.ethnic")}:
            </label>
            <Select<OptionType>
              id="etnia"
              options={etniaOptions}
              value={etniaOptions.find((option) => option.value === Etnia)}
              onChange={(option) => setEtnia(option ? option.value : 0)}
              styles={customStyles}
              className="text-black"
              classNamePrefix="select"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="ingresos" className="font-medium mb-1">
              {t("Poll.income")}:
            </label>
            <Select<OptionType>
              id="ingresos"
              options={ingresosOptions}
              value={ingresosOptions.find((option) => option.value === Ingresos)}
              onChange={(option) => setIngresos(option ? option.value : 0)}
              styles={customStyles}
              className="text-black"
              classNamePrefix="select"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="ocupacion" className="font-medium mb-1">
              {t("Poll.classification")}:
            </label>
            <Select<OptionType>
              id="ocupacion"
              options={ocupacionOptions}
              value={ocupacionOptions.find((option) => option.value === Ocupacion)}
              onChange={(option) => setOcupacion(option ? option.value : 0)}
              styles={customStyles}
              className="text-black"
              classNamePrefix="select"
            />
          </div>
        </div>
      </fieldset>

      {/* Survey Questions Section */}
      <fieldset className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {preguntas.map((pregunta) => (
            <div key={pregunta.id} className="flex flex-col">
              <label htmlFor={pregunta.id} className="font-medium mb-1">
                {pregunta.texto}
              </label>
              <Select<OptionType>
                id="pregunta.id"
                options={respuestaOptions}
                value={respuestaOptions.find((option) => option.value === respuestas[pregunta.id])}
                onChange={(option) => handleChangeRespuesta(pregunta.id, option ? option.value : 0)}
                styles={customStyles}
                className="text-black"
                classNamePrefix="select"
              />
            </div>
          ))}
        </div>
      </fieldset>

      {/* Error and Success Messages */}
      {error && (
        <p className="mt-4 text-red-600 bg-red-50 p-3 rounded-lg" role="alert">
          {error}
        </p>
      )}
      {mensaje && (
        <p className="mt-4 text-green-600 bg-green-50 p-3 rounded-lg" role="status">
          {mensaje}
        </p>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className={`mt-6 w-full md:w-auto bg-cyan-950 text-white px-6 py-3 rounded-lg hover:bg-cyan-600 transition duration-200 flex items-center justify-center ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        aria-busy={isLoading}
      >
        {isLoading ? (
          <>{t("Poll.submitting") || "Submitting..."}</>
        ) : (
          t("Steppers.Submit") || "Submit"
        )}
      </button>
    </form>
  );
};

export default SurveyForm;