import React from "react";

import { Country } from "../types";

interface IProps {
  isLoading: boolean;
  countries: Country[] | undefined;
  selectCountry: (arg: string) => void;
}

const CountriesList: React.FunctionComponent<IProps> = (props) => {
  return (
    <select onChange={(e) => props.selectCountry(e.target.value)}>
      <option value=""></option>
      {props.countries?.map((country) => (
        <option value={country.Slug} key={country.Slug}>
          {country.Country}
        </option>
      ))}
    </select>
  );
};

export default CountriesList;
