import axios from "axios";
import { useEffect, useState } from "react";

const useDpeOptions = () => {
  const [options, setOptions] = useState();

  useEffect(() => {
    const opts = new Promise(async (resolve, rejects) => {
      const res = await axios.get("http://127.0.0.1:8000/dpe/options");
      return resolve(res.data);
    });
  }, []);

  return options;
};
