import { useState } from "react";

import Header from "./Header";
import Spinner from "./Spinner";
import CountriesList from "./CountriesList";
import CountriesStats from "./CountryStats";

import { Country } from "../types";
import { useCountriesList } from "../hooks";
import NetworkStatus from "./NetworkStatus";

import { ReactComponent as IconNoWifi } from "../assets/images/no-wifi-icon.svg";

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
                  {selectedCountry && <CountriesStats slug={selectedCountry} />}
                </>
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    rowGap: "1rem",
                  }}
                >
                  <IconNoWifi />
                  No network connection
                </div>
              )
            }
          />
        )}
      </div>
    </>
  );
}

export default App;
