import axios from "axios";
import { useEffect, useState } from "react";

const useDpeOptions = () => {
  const [options, setOptions] = useState();

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/dpe/options").then((res) => {
      setOptions(res.data);
    });
  }, []);

  return options;
};
