import React from "react";

import { useCountryStats } from "../hooks";

import { NormalizedStats } from "../types";
import Spinner from "./Spinner";

import styles from "./CountryStats.module.scss";

interface IProps {
  slug: string;
}

const CountriesStats: React.FunctionComponent<IProps> = (props) => {
  const [stats, isLoading]: [NormalizedStats | undefined, boolean] =
    useCountryStats(props.slug);

  return isLoading ? (
    <Spinner />
  ) : stats ? (
    <section className={styles.container}>
      {Object.entries(stats as NormalizedStats).map((entry) => {
        return (
          <div key={entry[0]}>
            <strong>{entry[0].replace("_", " ")}</strong>
            <label>{entry[1]}</label>
          </div>
        );
      })}
    </section>
  ) : (
    <></>
  );
};

export default CountriesStats;
