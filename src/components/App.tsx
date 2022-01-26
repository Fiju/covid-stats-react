import { useState } from "react";

import Spinner from "./Spinner";
import CountriesList from "./CountriesList";
import CountriesStats from "./CountryStats";

import { Country } from "../types";
import { useCountriesList } from "../hook";

import styles from "./App.module.scss";

function App() {
  const [countriesList, isFetching]: [Country[], boolean] = useCountriesList();
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  return isFetching ? (
    <Spinner />
  ) : (
    <div className={styles.container}>
      <h1>Covid Statistics</h1>
      <CountriesList
        countries={countriesList}
        selectedCountry={selectedCountry}
        selectCountry={setSelectedCountry}
      />
      <CountriesStats slug={selectedCountry} />
    </div>
  );
}

export default App;
