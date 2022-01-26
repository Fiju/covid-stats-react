import { useState } from "react";

import Spinner from "./Spinner";
import CountriesList from "./CountriesList";
import CountriesStats from "./CountryStats";

import { Country } from "../types";
import { useCountriesList } from "../hook";
import NetworkStatus from "./NetworkStatus";

import { ReactComponent as IconNoWifi } from "../assets/images/no-wifi-icon.svg";
import Header from "./Header";

function App() {
  const [countriesList, isFetching]: [Country[], boolean] = useCountriesList();
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  return (
    <>
      <Header />
      <div>
        {isFetching ? (
          <Spinner />
        ) : (
          <NetworkStatus
            render={(status: boolean | undefined) =>
              status !== false ? (
                <>
                  <CountriesList
                    countries={countriesList}
                    selectedCountry={selectedCountry}
                    selectCountry={setSelectedCountry}
                  />
                  <CountriesStats slug={selectedCountry} />
                </>
              ) : (
                <IconNoWifi />
              )
            }
          />
        )}
      </div>
    </>
  );
}

export default App;
