import merge from "lodash/merge";

export function get(endpoint: string, options?: object) {
  const mergedOptions = merge(
    {
      method: "GET",
    },
    options
  );
  return fetchJSON(endpoint, mergedOptions);
}

function fetchJSON(url: string, options?: any) {
  const mergedOptions = merge(
    {
      headers: {
        "content-type": "application/json",
      },
    },
    options
  );
  return fetch(url, mergedOptions).then(parseJSONResponse);
}

function parseJSONResponse(response: any) {
  if (response.status === 204) {
    return {
      status: response.status,
      ok: response.ok,
      json: {},
      unauthorized: false,
      forbidden: false,
    };
  } else if (response.status === 500) {
    return response.text().then((text: string) => ({
      status: response.status,
      ok: response.ok,
      text,
      unauthorized: response.status === 401,
      forbidden: response.status === 403,
    }));
  } else {
    return response.json().then((json: any) => ({
      status: response.status,
      ok: response.ok,
      json,
      unauthorized: response.status === 401,
      forbidden: response.status === 403,
    }));
  }
}

/**
 * Returns all countries and associated provinces.
 * The country_slug variable is used for country specific data
 * @param
 * @returns {object} list of countries with name, slug and ISO2 code
 */
export const getCountries = (): any => {
  return get("/countries");
};

/**
 * Returns one day stats of a country
 * @param {string} slug of country
 * @returns {object} list of stats
 */
export const getCountryStatsForLastMonth = (
  slug: string,
  startDate: string,
  endDate: string
): any => {
  return get(`/total/country/${slug}?from=${startDate}&to=${endDate}`);
  // return get(`/country/${slug}?from=${startDate}&to=${endDate}`);
};
