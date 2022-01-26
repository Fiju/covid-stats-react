export interface Country {
  Country: string;
  Slug: string;
  ISO2: string;
}

export interface CountryStats {
  ID: string;
  Country: string;
  CountryCode: string;
  Province: string;
  City: string;
  CityCode: string;
  Lat: string;
  Lon: string;
  Confirmed: number;
  Deaths: number;
  Recovered: number;
  Active: number;
  Date: string;
}

export interface NormalizedStats {
  total_deaths?: number | undefined;
  total_cases?: number | undefined;
  country?: number | undefined;
  new_cases?: number | undefined;
  new_death?: number | undefined;
}
