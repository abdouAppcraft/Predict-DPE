import axios from "axios";
import { useEffect, useState } from "react";

type DPE_Options_Type = {
  Qualite_isolation_enveloppe: string[];
  Type_energie_principale_chauffage: string[];
  Type_installation_chauffage: string[];
  Qualite_isolation_menuiseries: string[];
};
export const useDpeOptions = () => {
  const [options, setOptions] = useState<DPE_Options_Type>();

  useEffect(() => {
    axios
      .get<DPE_Options_Type>("http://127.0.0.1:8000/dpe/options")
      .then((res) => {
        setOptions(res.data);
      });
  }, []);

  return options;
};
