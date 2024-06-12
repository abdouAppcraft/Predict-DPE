import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDpeOptions } from "../../hooks/useDpeOptions";
import "./PredictForm.css";
import strings from "../../strings/string";
import axios from "axios";
import computeData from "../../utils/computeData";
import Result from "../Result/Result";

type Field = {
  name: string;
  type: string;
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

  const [prediction, setPrediction] = useState<string | null>(null);
  const navigate = useNavigate();
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
      const response = await axios.post<{
        Etiquette_DPE: number;
        Etiquette_GES: number;
      }>("http://localhost:8000/", computeData(formData));
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
        <section>
          <h2>Predicted DPE: {prediction}</h2>
          <Result {...prediction} />
        </section>
      )}
    </main>
  );
};

export default PredictForm;
