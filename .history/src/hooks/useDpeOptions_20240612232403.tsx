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
      .get<DPE_Options_Type>(`${process.env.REACT_APP_BASE_URL}`)
      .then((res) => {
        setOptions(res.data);
      });
  }, []);

  return options;
};
