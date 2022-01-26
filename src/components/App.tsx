import { useState } from "react";

import CountriesList from "./CountriesList";
import CountriesStats from "./CountryStats";

import { Country } from "../types";
import { useCountriesList } from "../hook";

function App() {
  const [countriesList, isFetching]: [Country[], boolean] = useCountriesList();
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  return (
    <div>
      <CountriesList
        countries={countriesList}
        isLoading={isFetching}
        selectCountry={setSelectedCountry}
      />
      <CountriesStats slug={selectedCountry} />
    </div>
  );
}

export default App;
