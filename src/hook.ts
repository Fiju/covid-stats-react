import { useEffect, useState } from "react";
import * as api from "./services/api";
import { Country, CountryStats } from "./types";

export const useCountriesList = (): [Country[], boolean] => {
  const [data, setData] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetch() {
      setIsLoading(true);
      const res = await api.getCountries();
      if (res.ok) {
        setData(res.json);
        setIsLoading(false);
      }
    }
    fetch();
  }, []);

  return [data, isLoading];
};
