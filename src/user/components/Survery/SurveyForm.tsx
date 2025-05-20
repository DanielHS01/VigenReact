import React, { useState } from "react";
import { submitSurvey, SurveyData } from "@/user/services/pollService";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  const handleChangeRespuesta = (pregunta: string, valor: string) => {
    setRespuestas((prev) => ({
      ...prev,
      [pregunta]: Number(valor),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
      P1: respuestas.p1,
      P2: respuestas.p2,
      P3: respuestas.p3,
      P4: respuestas.p4,
      P5: respuestas.p5,
      P6: respuestas.p6,
      P7: respuestas.p7,
    };

    try {
      await submitSurvey(surveyData);
      setMensaje("Encuesta enviada correctamente.");
    } catch (error) {
      setMensaje("Error al enviar la encuesta.");
    }
  };

  const preguntas = [
    { id: "p1", texto: t("Poll.questionsDescription") },
    { id: "p2", texto: t("Poll.punching") },
    { id: "p3", texto: t("Poll.threatened") },
    { id: "p4", texto: t("Poll.pressured") },
    {
      id: "p5",
      texto: t("Poll.belongings"),
    },
    { id: "p6", texto: t("Poll.shaken") },
    { id: "p7", texto: t("Poll.assaulted") },
  ];

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Campos personales */}
        <div className="flex flex-col">
          <label className="font-medium">{t("Login.id")}:</label>
          <input
            className="border rounded p-2"
            value={UserId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium">{t("Poll.age")}:</label>
          <input
            type="number"
            className="border rounded p-2"
            value={Edad}
            onChange={(e) => setEdad(Number(e.target.value))}
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium">{t("Poll.gender")}:</label>
          <select
            className="border rounded p-2"
            value={Genero}
            onChange={(e) => setGenero(Number(e.target.value))}
          >
            <option value={0}>{t("Poll.man")}</option>
            <option value={1}>{t("Poll.woman")}</option>
            <option value={2}>{t("Poll.binary")}</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="font-medium">{t("Poll.orientation")}:</label>
          <select
            className="border rounded p-2"
            value={OrientacionSexual}
            onChange={(e) => setOrientacionSexual(Number(e.target.value))}
          >
            <option value={0}>{t("Poll.hetero")}</option>
            <option value={1}>{t("Poll.homo")}</option>
            <option value={2}>{t("Poll.bi")}</option>
            <option value={3}>{t("Poll.asexual")}</option>
            <option value={4}>{t("Poll.pan")}</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="font-medium">{t("Poll.city")}:</label>
          <select
            className="border rounded p-2"
            value={Municipio}
            onChange={(e) => setMunicipio(Number(e.target.value))}
          >
            <option value={0}>Facatativá</option>
            <option value={1}>Madrid</option>
            <option value={2}>Mosquera</option>
            <option value={3}>{t("Poll.other")}</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="font-medium">{t("Poll.area")}:</label>
          <select
            className="border rounded p-2"
            value={Sector}
            onChange={(e) => setSector(Number(e.target.value))}
          >
            <option value={0}>{t("Poll.rural")}</option>
            <option value={1}>{t("Poll.urban")}</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="font-medium">{t("Poll.education")}:</label>
          <select
            className="border rounded p-2"
            value={NivelEducativo}
            onChange={(e) => setNivelEducativo(Number(e.target.value))}
          >
            <option value={0}>{t("Poll.elementary")}</option>
            <option value={1}>{t("Poll.secondary")}</option>
            <option value={2}>{t("Poll.highschool")}</option>
            <option value={3}>{t("Poll.technical")}</option>
            <option value={4}>{t("Poll.undergraduate")}</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="font-medium">{t("Poll.marital")}:</label>
          <select
            className="border rounded p-2"
            value={EstadoCivil}
            onChange={(e) => setEstadoCivil(Number(e.target.value))}
          >
            <option value={0}>{t("Poll.single")}</option>
            <option value={1}>{t("Poll.married")}</option>
            <option value={2}>{t("Poll.widowed")}</option>
            <option value={3}>{t("Poll.free")}</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="font-medium">{t("Poll.ethnic")}:</label>
          <select
            className="border rounded p-2"
            value={Etnia}
            onChange={(e) => setEtnia(Number(e.target.value))}
          >
            <option value={0}>{t("Poll.afro")}</option>
            <option value={1}>{t("Poll.indigenous")}</option>
            <option value={2}>{t("Poll.rom")}</option>
            <option value={3}>{t("Poll.narp")}</option>
            <option value={4}>{t("Poll.none")}</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="font-medium">{t("Poll.income")}:</label>
          <select
            className="border rounded p-2"
            value={Ingresos}
            onChange={(e) => setIngresos(Number(e.target.value))}
          >
            <option value={0}>{t("Poll.no")}</option>
            <option value={1}>{t("Poll.yes")}</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="font-medium">{t("Poll.classification")}:</label>
          <select
            className="border rounded p-2"
            value={Ocupacion}
            onChange={(e) => setOcupacion(Number(e.target.value))}
          >
            <option value={0}>{t("Poll.private")}</option>
            <option value={1}>{t("Poll.government")}</option>
            <option value={2}>{t("Poll.domestic")}</option>
            <option value={3}>{t("Poll.self")}</option>
            <option value={4}>{t("Poll.employer")}</option>
            <option value={5}>{t("Poll.unpaid")}</option>
            <option value={6}>{t("Poll.student")}</option>
            <option value={7}>{t("Poll.unemployed")}</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
        {preguntas.map((pregunta) => (
          <div key={pregunta.id} className="flex flex-col">
            <label className="font-medium">{pregunta.texto}</label>
            <select
              className="border rounded p-2"
              value={respuestas[pregunta.id]}
              onChange={(e) =>
                handleChangeRespuesta(pregunta.id, e.target.value)
              }
            >
              <option value={0}>{t("Poll.no")}</option>
              <option value={1}>{t("Poll.yes")}</option>
            </select>
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        {t("Steppers.Submit") || "Enviar"}
      </button>

      {mensaje && <p className="mt-4 text-green-600">{mensaje}</p>}
    </form>
  );
};

export default SurveyForm;
