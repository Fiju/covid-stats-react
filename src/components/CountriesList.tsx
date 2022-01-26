import React from "react";

import { Country } from "../types";

interface IProps {
  countries: Country[] | undefined;
  selectedCountry: string;
  selectCountry: (arg: string) => void;
}

const CountriesList: React.FunctionComponent<IProps> = (props) => {
  return (
    <form>
      <fieldset>
        <select
          value={props.selectedCountry}
          onChange={(e) => props.selectCountry(e.target.value)}
        >
          <option value=""></option>
          {props.countries?.map((country) => (
            <option value={country.Slug} key={country.Slug}>
              {country.Country}
            </option>
          ))}
        </select>
      </fieldset>
    </form>
  );
};

export default CountriesList;
