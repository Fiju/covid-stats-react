import React from "react";

import { useCountryStats } from "../hook";

import { CountryStats } from "../types";

interface IProps {
  slug: string;
}

const CountriesStats: React.FunctionComponent<IProps> = (props) => {
  const [stats, isLoading]: [CountryStats[], boolean] = useCountryStats(
    props.slug
  );

  return <code>{JSON.stringify(stats || {})}</code>;
};

export default CountriesStats;
