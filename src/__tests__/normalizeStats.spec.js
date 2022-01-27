import { normalize } from "../services/normalizeStats";

const dummyData = [
  {
    Country: "Denmark",
    Confirmed: 10000,
    Deaths: 100,
    Date: "2021-12-26T00:00:00Z",
  },
  {
    Country: "Denmark",
    Confirmed: 10010,
    Deaths: 110,
    Date: "2021-12-27T00:00:00Z",
  },
  {
    Country: "Denmark",
    Confirmed: 10020,
    Deaths: 120,
    Date: "2021-12-28T00:00:00Z",
  },
];

test("if normalizer works fine", () => {
  const res = normalize(dummyData);
  expect(res).toStrictEqual({
    country: "Denmark",
    total_deaths: 120,
    total_cases: 10020,
    new_cases_since_yesterday: 10,
    new_death_since_yesterday: 10,
    new_cases_since_last_month: 20,
    new_deaths_since_last_month: 20,
  });
});
