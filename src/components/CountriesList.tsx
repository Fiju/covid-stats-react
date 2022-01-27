import React, { useMemo, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { Search as SearchEngine, AllSubstringsIndexStrategy } from "js-search";
import { Country } from "../types";

import styles from "./CountriesList.module.scss";

interface IProps {
  countries: Country[] | undefined;
  selectedCountry: string;
  selectCountry: (arg: string) => void;
}

function getEngine(data: Country[] | undefined) {
  const engine = new SearchEngine("ISO2");
  engine.indexStrategy = new AllSubstringsIndexStrategy();
  engine.addIndex("Slug");
  engine.addDocuments(data as Object[]);
  return engine;
}

const CountriesList: React.FunctionComponent<IProps> = (props) => {
  const [query, setQuery] = useState<string>(props.selectedCountry || "");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  let searchEngine: any = useMemo(
    () => getEngine(props.countries || []),
    [props.countries]
  );

  const filteredItems: Array<Country> = useMemo(
    () => (query ? searchEngine.search(query) : props.countries),
    [props.countries, query, searchEngine]
  );
  return (
    <div className={styles.container}>
      <input
        data-testid="country-list"
        value={query.replaceAll("-", " ")}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        placeholder="Select country"
      />
      <CSSTransition
        in={isOpen}
        timeout={141.59}
        classNames={styles}
        mountOnEnter
        unmountOnExit
      >
        <div className={styles.Drawer} data-testid="country-picker">
          <ul>
            {filteredItems?.map((country) => (
              <li
                value={country.Slug}
                key={country.Slug}
                onClick={() => {
                  setQuery(country.Country);
                  props.selectCountry(country.Slug);
                }}
              >
                {country.Country}
              </li>
            ))}
          </ul>
        </div>
      </CSSTransition>
    </div>
  );
};

export default CountriesList;
