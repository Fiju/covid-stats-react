import { useState } from "react";
import CountriesList from "./CountriesList";
import { useCountriesList } from "../hook";
import { Country } from "../types";

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
    </div>
  );
}

export default App;
