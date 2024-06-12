const computeData = (data: Record<string, any>) => {
  const newData = { ...data };
  for (var key in data) {
    if (key === "Annee_construction") {
      newData[key] = new Date(data[key]).getFullYear;
    }
  }
  return newData;
};

export default computeData;
