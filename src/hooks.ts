import { useEffect, useState } from "react";
import * as api from "./services/api";
import { Country, NormalizedStats } from "./types";
import { getIsoDate } from "./services/getIsoDate";
import { normalize } from "./services/normalizeStats";

export const useCountriesList = (): [Country[], boolean] => {
  const [data, setData] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetch() {
      setIsLoading(true);
      const res = await api.getCountries();
      if (res.ok) {
        setData(
          //  @ts-ignore
          res.json.sort((a: Country, b: Country) => {
            if (a.Slug < b.Slug) {
              return -1;
            }
            if (a.Slug > b.Slug) {
              return 1;
            }
            return 0;
          })
        );
        setIsLoading(false);
      }
    }
    fetch();
  }, []);

  return [data, isLoading];
};

export const useCountryStats = (
  slug: string
): [NormalizedStats | undefined, boolean] => {
  const [data, setData] = useState<NormalizedStats>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetch() {
      if (slug) {
        setIsLoading(true);
        const currentDate = new Date();
        const endData = getIsoDate(currentDate);
        const startDate = getIsoDate(
          new Date(currentDate.setMonth(currentDate.getMonth() - 1))
        );
        const res = await api.getCountryStatsForLastMonth(
          slug,
          startDate,
          endData
        );
        if (res.ok) {
          const normalizedData = normalize(res.json);
          setData(normalizedData);
        } else {
          setData({ error: "There was problem fetching data" });
        }
      } else setData({});
      setIsLoading(false);
    }
    fetch();
  }, [slug]);

  return [data, isLoading];
};
