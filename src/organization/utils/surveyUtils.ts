// utils/surveyUtils.ts
type SurveyRecord = {
    p1: number;
    p2: number;
    p3: number;
    p4: number;
    p5: number;
    p6: number;
    p7: number;
  };
  
  const questionLabels = {
    p1: 'Golpear/patear objetos',
    p2: 'Amenazas de golpe',
    p3: 'Presionado sexualmente',
    p4: 'Destrucción de pertenencias',
    p5: 'Sacudido o jaloneado',
    p6: 'Agresión física',
    p7: 'Agresión psicológica',
  };
  
  export const processViolenceStatistics = (records: SurveyRecord[]) => {
    const totals: { name: string; value: number }[] = [];
  
    const totalRecords = records.length;
  
    for (const key in questionLabels) {
      const yesCount = records.filter((r) => r[key as keyof SurveyRecord] === 1).length;
      const percentage = ((yesCount / totalRecords) * 100).toFixed(2);
  
      totals.push({
        name: questionLabels[key as keyof typeof questionLabels],
        value: parseFloat(percentage),
      });
    }
  
    return totals;
  };
  