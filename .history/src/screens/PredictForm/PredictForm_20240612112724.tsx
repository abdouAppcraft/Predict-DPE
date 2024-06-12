import axios from "axios";
import React, { useState } from "react";
import { useDpeOptions } from "../../hooks/useDpeOptions";
import strings from "../../strings/string";
import computeData from "../../utils/computeData";
import ResultDPE from "../Result/ResultDPE";
import "./PredictForm.css";
import ResultGES from "../Result/ResultGES";

type Field = {
  name: string;
  type: string;
};

export type DpeGesType = {
  Etiquette_DPE: number;
  Etiquette_GES: number;
};

const field: Field[] = [
  { name: "Annee_construction", type: "date" },
  { name: "Cout_total_5_usages", type: "number" },
  { name: "Surface_habitable_logement", type: "number" },
];

const advancedField: Field[] = [
  { name: "Qualite_isolation_enveloppe", type: "select" },
  { name: "Type_energie_principale_chauffage", type: "select" },
  { name: "Type_installation_chauffage", type: "select" },
  { name: "Code_postal_BAN", type: "address" },
  { name: "Conso_5_usages_e_finale", type: "number" },
  { name: "Conso_5_usagesm2_e_finale", type: "number" },
  { name: "Emission_GES_5_usages", type: "number" },
  { name: "Emission_GES_5_usages_par_m2", type: "number" },
  { name: "Cout_chauffage", type: "number" },
  { name: "Cout_ECS", type: "number" },
  { name: "Qualite_isolation_menuiseries", type: "select" },
];

const PredictForm: React.FC = () => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [advancedOp, setAdvancedOp] = useState<boolean>(false);

  const [prediction, setPrediction] = useState<{
    Etiquette_DPE: number;
    Etiquette_GES: number;
  } | null>(null);
  const options = useDpeOptions();

  console.log({ options });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<DpeGesType>(
        "http://localhost:8000/",
        computeData(formData)
      );
      // console.log("Prediction Response:", response.data); // Ajoutez ce journal pour voir la réponse
      // setPrediction(response.data.predicted_DPE);
      if (response.data) {
        setPrediction(response.data);
      }
    } catch (error) {
      console.error("There was an error making the request:", error);
    }
  };

  const renderRow = (f: Field) => {
    switch (f.type) {
      case "select":
        return (
          <div className="form-group">
            <label>{strings[f.name as keyof typeof strings]}</label>
            <select
              name={f.name}
              value={formData[f.name]}
              onChange={handleChange}
              required
            >
              {options &&
                Object.hasOwn(options, f.name) &&
                options[f.name as keyof typeof options].map(
                  (option: string) => {
                    return <option>{option} </option>;
                  }
                )}
            </select>
          </div>
        );

      default:
        return (
          <>
            <div className="form-group">
              <label>{strings[f.name as keyof typeof strings]}</label>
              <input
                type={f.type}
                name={f.name}
                value={formData[f.name]}
                onChange={handleChange}
                required
              />
            </div>
          </>
        );
    }
  };

  return (
    <main className="predict-form">
      <section>
        <h1>Predict DPE</h1>
        <form onSubmit={handleSubmit}>
          <button type="submit" className="submit-btn">
            Predict
          </button>
          {field.map((f) => renderRow(f))}
          <div
            className="form-group"
            style={{ display: "flex", alignItems: "baseline" }}
          >
            <label htmlFor="advancedField">
              {advancedOp
                ? "Masquer les Options avancées"
                : "Afficher les options avancées"}
            </label>
            <input
              type="checkbox"
              name="advancedField"
              checked={advancedOp}
              onChange={(e) => setAdvancedOp(!advancedOp)}
            />
          </div>
          {advancedOp && advancedField.map((f) => renderRow(f))}
        </form>
      </section>
      {prediction && (
        <section
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <h2>Diagnostic de Performance Énergétique et Climatique (DPE)</h2>
          <div>
            {" "}
            <div>
              <h3>Score consommation énergie</h3>
              <ResultDPE {...prediction} />
            </div>
            <div
              style={{
                border: "solid gray",
                backgroundColor: "white",
                padding: "1rem",
                width: "fit-content",
                borderRadius: ".5rem",
              }}
            >
              <h3>Score GES (Gaz à Effet de Serre)</h3>
              <ResultGES {...prediction} />
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default PredictForm;
