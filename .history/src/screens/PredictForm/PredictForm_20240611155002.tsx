import React, { useState } from "react";
import axios from "axios";
import "./PredictForm.css";
import { useNavigate } from "react-router-dom";
import { useDpeOptions } from "../../hooks/useDpeOptions";

type Field = {
  name: string;
  type: string;
};

const field: Field[] = [
  { name: "Annee_construction", type: "date" },
  { name: "Cout_total_5_usages", type: "number" },
  { name: "Surface_habitable_logement", type: "number" },
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
    console.log("Form Data Submitted:", formData); // Ajoutez ce journal pour voir les données soumises
    try {
      // const response = await axios.post(
      //   "http://localhost:8000/predict/",
      //   formData
      // );
      // console.log("Prediction Response:", response.data); // Ajoutez ce journal pour voir la réponse
      // setPrediction(response.data.predicted_DPE);
      navigate("/result");
    } catch (error) {
      console.error("There was an error making the request:", error);
    }
  };

  const renderRow = (f: Field) => {
    switch (f.type) {
      case "select":
        break;

      default:
        <div className="form-group">
          <label>Année de construction:</label>
          <input
            type={f.type}
            name={f.name}
            value={formData[f.name]}
            onChange={handleChange}
            required
          />
        </div>;
    }
  };

  return (
    <div className="predict-form">
      <h1>Predict DPE</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Surface habitable (m²):</label>
          <input
            type="number"
            name="Surface_habitable"
            value={formData.Surface_habitable}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Année de construction:</label>
          <input
            type="number"
            name="Annee_construction"
            value={formData.Annee_construction}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Type de chauffage:</label>
          <select
            name="Type_chauffage"
            value={formData.Type_chauffage}
            onChange={handleChange}
            required
          >
            <option value="">--Choisir--</option>
            <option value="électrique">Électrique</option>
            <option value="gaz">Gaz</option>
            <option value="fioul">Fioul</option>
            <option value="bois">Bois</option>
            <option value="autre">Autre</option>
          </select>
        </div>
        <div className="form-group">
          <label>Panneaux solaires:</label>
          <input
            type="checkbox"
            name="Panneaux_solaires"
            checked={formData.Panneaux_solaires}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Nombre de pièces:</label>
          <input
            type="number"
            name="Nombre_pieces"
            value={formData.Nombre_pieces}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Predict
        </button>
      </form>
      {prediction && <h2>Predicted DPE: {prediction}</h2>}
    </div>
  );
};

export default PredictForm;
