import { render, screen } from "@testing-library/react";
import CountriesList from "../components/CountriesList";

test("if country dropdown is rendered", () => {
  render(<CountriesList />);

  const dropdown = screen.getByTestId("country-list");
  expect(dropdown).toBeInTheDocument();
});

test("if country dropdown is rendered", () => {
  render(<CountriesList />);
  const dropdown = screen.getByTestId("country-list");
  expect(dropdown.childElementCount).toBe(1);
});

test("if country dropdown is has passed in countries as options", () => {
  render(
    <CountriesList
      countries={[
        {
          Country: "Kuwait",
          Slug: "kuwait",
          ISO2: "KW",
        },
        {
          Country: "Panama",
          Slug: "panama",
          ISO2: "PA",
        },
      ]}
    />
  );
  const dropdown = screen.getByTestId("country-list");
  expect(dropdown.childElementCount).toBe(3);
});
