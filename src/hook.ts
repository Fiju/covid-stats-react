import { useEffect, useState } from "react";
import * as api from "./services/api";
import { Country, CountryStats } from "./types";
import { getIsoDate } from "./services/getIsoDate";

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

export const useCountryStats = (slug: string): [CountryStats[], boolean] => {
  const [data, setData] = useState<CountryStats[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetch() {
      if (slug) {
        const currentDate = new Date();
        const endData = getIsoDate(currentDate);
        const startDate = getIsoDate(new Date(Date.now() - 86400000));
        setIsLoading(true);
        const res = await api.getCountryStatsPerDay(slug, startDate, endData);
        if (res.ok) {
          setData(res.json);
          setIsLoading(false);
        }
      }
    }
    fetch();
  }, [slug]);

  return [data, isLoading];
};
